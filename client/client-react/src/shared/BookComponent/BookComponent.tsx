import React from "react";
import ReactModal from 'react-modal';
import { Book } from "../../models/book.model";
import { CategoryAuthor } from '../../models/category-author.model';
import './style.scss';
import { EditeModal } from "./editeModal/editeModal";
import DeleteModal from "./deleteModal/deleteModal";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    minWidth              : '550px'
  }
};

interface BookProps {
  book: Book;
  buttonStatus: {
    editeBtn: boolean,
    deleteBtn: boolean,
    ddToDbBtn: boolean,
    addToFavoriteBtn: boolean
  };
  deleteFromDB: (book: Book) => void;
  addToFavorite: (book: Book) => void;
  editeBook: (book: Book) => void;
}

interface BookState {
  book: Book;
  addBookToFavorite: boolean;
  deleteFromFavorites: boolean;
  bookDeleteModal: boolean;
  bookEditeModal: boolean;
  options: any;
};

export class BookComponent extends React.Component<BookProps, BookState> {
  constructor(props: BookProps) {
    super(props as BookProps);

    this.state = {
      book: {
        ...this.props.book
      },
      addBookToFavorite: false,
      deleteFromFavorites: false,
      bookDeleteModal: false,
      bookEditeModal: false,

      options: [{name: 'Srigar', id: 1},{name: 'Sam', id: 2}],
    };

    this.addBookToFavoriteModal = this.addBookToFavoriteModal.bind(this);
    this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    this.bookDeleteModal = this.bookDeleteModal.bind(this);
    this.bookEditeModal = this.bookEditeModal.bind(this);
    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);

    this.addBooktoFavorite = this.addBooktoFavorite.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement('.bookComponent')
  };
  
  public addBookToFavoriteModal(): void {
    this.setState({
      addBookToFavorite: !(this.state as any).addBookToFavorite
    })
  }

  public deleteFromFavorites(): void {
    this.setState({
      deleteFromFavorites: !(this.state as any).deleteFromFavorites
    })
  }

  public bookDeleteModal(): void {
    this.setState({
      bookDeleteModal: !(this.state as any).bookDeleteModal
    })
  }

  public bookEditeModal(): void {
    this.setState({
      bookEditeModal: !(this.state as any).bookEditeModal
    })
  }

  public deleteBookFromDB() {
    this.bookDeleteModal();
    this.props.deleteFromDB(this.props.book);
  }

  public addBooktoFavorite() {
    this.props.addToFavorite(this.props.book);
  }

  render() {
    const image = this.props.book.image?
        this.props.book.image
        : this.props.book.imageLinks as {thumbnail: string}?
        (this.props.book.imageLinks as {thumbnail: string}).thumbnail
        : '';
    const categories = this.props.book.categories_list?
        (this.props.book.categories_list as CategoryAuthor[]).map((category: CategoryAuthor) => {
          return category.name;
        })
        : this.props.book.categories?
        this.props.book.categories
        : null;
    const authors = this.props.book.authors_list?
        (this.props.book.authors_list as CategoryAuthor[]).map((author: CategoryAuthor) => {
          return author.name;
        })
        : this.props.book.authors?
        this.props.book.authors
        : null;
    
    return (
      <div className="z-depth-4 bookComponent">
        <ReactModal
        isOpen={(this.state as any).bookDeleteModal as boolean}
        style={customStyles}
        contentLabel="Delete book from DataBase"
        >
          <DeleteModal 
            book={this.props.book}
            close={this.bookDeleteModal}
            deleteFromDB={this.deleteBookFromDB}
          />
        </ReactModal>

        <ReactModal
        isOpen={(this.state as any).bookEditeModal as boolean}
        style={customStyles}
        contentLabel="Edite book modal">
          <EditeModal 
            book={this.props.book}
            close={this.bookEditeModal}
            editeBook={this.props.editeBook}
          />
        </ReactModal>

        <div className="card horizontal">
          <div className="card-image">
            <img alt="Bookimage" src={image as string} className="book-image" />
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
                {(categories as string[]).map((category: string, index: number) => {
                  return (
                    <span
                    key={index}
                    className="chip"
                    >{category}</span>
                    )
                  })
                }
              <br />
              <b>Author: </b>
              {(authors as string[]).map((author: string, index: number) => {
              return (
                <span 
                key={index}
                className="chip"
                >{author}</span>
              )
              })}
              <p className="book-description"><span>
              <b>Description</b>:</span> {this.props.book.description}</p>
              <p><b>Pages: </b>{this.props.book.pageCount}</p>
            </div> 
            <div className="card-action">
              {this.props.buttonStatus.addToFavoriteBtn && !this.props.book.inFavorite ?
              <button
              className="btn green add-to-pro-btn"
              onClick={this.addBooktoFavorite}
              >
              add to 'My favorites'
              </button>
              : null}
              {this.props.buttonStatus.addToFavoriteBtn && this.props.book.inFavorite ?
              <button
              className="btn red add-to-pro-btn"
              onClick={this.addBooktoFavorite}
              >
              delete from 'My favorites'
              </button>
              : null}
              {this.props.buttonStatus.ddToDbBtn ?
              <button
                className="btn add-to-pro-btn"
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

