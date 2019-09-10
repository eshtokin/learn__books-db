import React from "react";
import './style.scss'
import { Book } from "../../models/book.model";
import { CategoryAuthor } from './../../models/category-author.model';
import { BookAddModal } from "./BookAddModal";
import { BookDeleteFromFavModal } from "./BookDeleteFromFavModal";
import { BookDeleteModal } from "./BookDeleteModal";
import { BookEditeFromFavModal } from "./BookEditeModal";
import { scrollToggle } from "../../service/scroll.service";

interface BookProps {
  book: Book;
  buttonStatus: {
    editeBtn: boolean,
    deleteBtn: boolean,
    ddToDbBtn: boolean,
    addToFavoriteBtn: boolean
  }
}

export class BookComponent extends React.Component<BookProps> {
  constructor(props: BookProps) {
    super(props as BookProps);
    
    this.state = {
      image: props.book.image? 
        props.book.image
        : props.book.imageLinks as {thumbnail: string}?
        (props.book.imageLinks as {thumbnail: string}).thumbnail
        : '',
      categories: props.book.categories_list?
        (props.book.categories_list as CategoryAuthor[]).map((category: CategoryAuthor) => {
          return category.name;
        })
        : props.book.categories?
        props.book.categories
        : null,
      authors: props.book.authors_list?
        (props.book.authors_list as CategoryAuthor[]).map((author: CategoryAuthor) => {
          return author.name;
        })
        : props.book.authors?
        props.book.authors
        : null,
      
      addBookToFavorite: false,
      deleteFromFavorites: false,
      bookDeleteModal: false,
      bookEditeModal: false
    };

    this.addBookToFavorite = this.addBookToFavorite.bind(this);
    this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    this.bookDeleteModal = this.bookDeleteModal.bind(this);
    this.bookEditeModal = this.bookEditeModal.bind(this);
  }

  public addBookToFavorite(): void {
    if (!(this.state as any).addBookToFavorite) {
      scrollToggle().hide()
    } else {
      scrollToggle().visible()
    }
    this.setState({
      addBookToFavorite: !(this.state as any).addBookToFavorite
    })
  }

  public deleteFromFavorites(): void {
    if (!(this.state as any).deleteFromFavorites) {
      scrollToggle().hide()
    } else {
      scrollToggle().visible()
    }
    this.setState({
      deleteFromFavorites: !(this.state as any).deleteFromFavorites
    })
  }

  public bookDeleteModal(): void {
    if (!(this.state as any).bookDeleteModal) {
      scrollToggle().hide()
    } else {
      scrollToggle().visible()
    }
    this.setState({
      bookDeleteModal: !(this.state as any).bookDeleteModal
    })
  }

  public bookEditeModal(): void {
    if (!(this.state as any).bookEditeModal) {
      scrollToggle().hide()
    } else {
      scrollToggle().visible()
    }
    this.setState({
      bookEditeModal: !(this.state as any).bookEditeModal
    })
  }

  render() {
    return (
      <div className="z-depth-4 bookComponent">
        <BookAddModal 
          show={(this.state as any).addBookToFavorite as boolean}
          onClose={this.addBookToFavorite}
        />
        <BookDeleteFromFavModal 
          show={(this.state as any).deleteFromFavorites as boolean}
          title={this.props.book.title}
          onClose={this.deleteFromFavorites}
        />
        <BookDeleteModal 
          show={(this.state as any).bookDeleteModal as boolean}
          title={this.props.book.title}
          onClose={this.bookDeleteModal}
        />
        <BookEditeFromFavModal 
          show={(this.state as any).bookEditeModal as boolean}
          title={this.props.book.title}
          onClose={this.bookEditeModal}
        />
        <div className="card horizontal">
          <div className="card-image">
            <img alt="Bookimage" src={(this.state as  any).image as string} className="book-image" />
            {
              this.props.buttonStatus.editeBtn ?
              <button
                onClick={this.bookEditeModal}
                className="btn edite-btn rework-btn"
                >
                <i className="material-icons">edite</i>
              </button>
              : null
            }
            {
              this.props.buttonStatus.deleteBtn ?
              <button
              onClick={this.bookDeleteModal}
              className="btn delete-btn rework-btn"
              >
                <i className="material-icons">delete</i>
              </button>
              : null
            }
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <div className="card-title">
                <b>{this.props.book.title}</b>
              </div>
                <b>Categories: </b>
                {(this.state as any).categories ?
                (this.state as any).categories.map((category: string, index: number) => {
                  return (
                    <span
                    key={index}
                    className="chip"
                    >{category}</span>
                  )
                })
                : <span>Unknown</span>
              }
              <br />
              <b>Author: </b>
              {((this.state as any).authors as string[]).map((author: string, index: number) => {
              return (
                <span 
                key={index}
                className="chip"
                >{author}</span>
              )
              })}
              <p className="book-description"><span // *ngIf="book.description"
              ><b>Description</b>:</span> {this.props.book.description}</p>
              <p><b>Pages: </b>{this.props.book.pageCount}</p>
            </div> 
            <div className="card-action">
              {this.props.buttonStatus.addToFavoriteBtn ? // && !book.inFavorite
              <button
              className="btn green add-to-pro-btn"
              onClick={this.addBookToFavorite}
              >
              add to 'My favorites'
              </button>
              : null}
              {/* *ngIf="this.props.buttonStatus.addToFavoriteBtn && book.inFavorite" */}
              {this.props.buttonStatus.addToFavoriteBtn ?
              <button
              className="btn red add-to-pro-btn"
              onClick={this.deleteFromFavorites}
              >
              delete from 'My favorites'
              </button>
              : null}
              {this.props.buttonStatus.ddToDbBtn ?
              <button
                className="btn add-to-pro-btn"
                // [disabled]="book.alreadyExistInBD"
                // (click)="addBookToDB(book)"
              >
              add to DB
              </button>
              : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}