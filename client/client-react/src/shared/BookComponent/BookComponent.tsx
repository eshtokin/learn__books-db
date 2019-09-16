import React from "react";
import ReactModal from 'react-modal';
import { Book } from "../../models/book.model";
import { CategoryAuthor } from '../../models/category-author.model';
import './style.scss'

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
}

export class BookComponent extends React.Component<BookProps> {
  constructor(props: BookProps) {
    super(props as BookProps);

    this.state = {
      addBookToFavorite: false,
      deleteFromFavorites: false,
      bookDeleteModal: false,
      bookEditeModal: false
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
  // mark
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
        isOpen={(this.state as any).addBookToFavorite as boolean}
        style={customStyles}
        contentLabel="Add book to favorites"
        >
          <div className="container center">
            <h3>Book successfully added</h3>
            <button
            className="btn green"
            onClick={this.addBookToFavoriteModal}
            >OK</button>
          </div>
        </ReactModal>

        <ReactModal
        isOpen={(this.state as any).bookDeleteModal as boolean}
        style={customStyles}
        contentLabel="Delete book from DataBase"
        >
           <div className="container center">
            Delete book from DataBase ?
            <br/>
            <b>{this.props.book.title}</b>

            <button className="btn green"
            onClick={this.bookDeleteModal}>
              Cancel
            </button>
            <button className="btn red"
            onClick={this.deleteBookFromDB}
            >
              Delete
            </button>
          </div>
        </ReactModal>
        
        <ReactModal
        isOpen={(this.state as any).deleteFromFavorites as boolean}
        style={customStyles}
        contentLabel="Book delete from favorites">
          <div className="container center">
            Delete book from "My Favorites" ?
            <br/>
            <b>{this.props.book.title}</b>
            <button className="btn green"
            onClick={this.deleteFromFavorites}>
              Cancel
            </button>
            <button className="btn red">
              Delete
            </button>
          </div>
        </ReactModal>

        <ReactModal
        isOpen={(this.state as any).bookEditeModal as boolean}
        style={customStyles}
        contentLabel="Book delete from favorites">
          Book edite modal
          <br/>
          <button className='btn'
          onClick={this.bookEditeModal}
          >close</button>
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
              // onClick={this.deleteFromFavorites}
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