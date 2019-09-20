import React from 'react';
import { UserService } from '../../service/users.service';
import { UserInfoService } from '../../service/user-info.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../models/user.model';
import { PaginationEvent } from '../../models/pagination-event.model';
import { Book } from '../../models/book.model';
import { CategoryAuthor } from '../../models/category-author.model';
import './style.scss';
import ReactModal from 'react-modal';
import FavoritesDetailsModal from './favoritesDetailsModal/favoritesDetailsModal';
import Pagination from 'rc-pagination';
import FavoritesDeleteModal from './favoritesDeleteModal/favoritesDeleteModal';

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

interface State {
  user: User;
  pagination: PaginationEvent,
  books: Book[];
  favoritesDetailsId: string;
  favoritesDetails: boolean;
  favoritesDeleteId: string;
  favoritesDeleteModal: boolean;
}

export default class Favorites extends React.Component<any, State> {
  public userInfoService: UserInfoService;
  public userService: UserService;
  public onSearchFieldChange: Subject<string>;

  constructor(props: any) {
    super(props);

    this.state = {
      user: {
        email: '',
        name: '',
        password: '',
        role: 2,
        _id: ''
      },
      pagination: {
        pageSize: 10,
        pageIndex: 0,
        length: 0
      },
      books: [],
      favoritesDetailsId: '',
      favoritesDetails: false,
      favoritesDeleteId: '',
      favoritesDeleteModal: false
    };

    this.onSearchFieldChange = new Subject<string>();
    this.onSearchFieldChange
    .pipe(debounceTime(500))
    .subscribe((value: string) => {
      this.searchFromFavorites(value)
    });

    this.userService = new UserService();
    this.userInfoService = new UserInfoService();

    this.searchFromFavorites = this.searchFromFavorites.bind(this);
    this.openBookDetails = this.openBookDetails.bind(this);
    this.favoritesDeleteModal = this.favoritesDeleteModal.bind(this);
    this.deleteBookFromFavorites = this.deleteBookFromFavorites.bind(this);
  }

  componentDidMount() {
    this.userService.getUser((this.userInfoService.getCurrentUser() as User).id as string)
    .then((user) => {
      if ((user.books as string[]).length > 0) {
        this.userService.getUserBooks(user.books as string[], this.state.pagination)
        .then(data => {
          this.setState({
            user,
            books: data[0].listOfItem as Book[],
            pagination: {
              ...this.state.pagination,
              length: data[0].totalCount[0].count
            }
          })
        })
      }
    });
    ReactModal.setAppElement('.favoritesComponent');
  }

  public searchFromFavorites(searchTitle: string) {
    this.userService.getUser((this.userInfoService.getCurrentUser() as User).id as string)
    .then((user: User) => {
      if ((user.books as string[]).length > 0) {
        this.userService.getUserBooks(user.books as string[], this.state.pagination, searchTitle)
        .then(books => {
          this.setState({
            books: books[0].listOfItem as Book[],
            pagination: {
              ...this.state.pagination,
              length: books[0].totalCount[0].count
            }
          });
        });
      }
    });
  }

  public deleteBookFromFavorites(bookId: string) {
    const user = {...this.state.user} ; 
    user.books = (user.books as string[]).filter(book => {
      return bookId !== book;
    });
    this.userService.edit(this.state.user._id, user)
    .then(() => {
      this.setState({
        user,
        books: this.state.books.filter(book => {
          return book._id !== bookId;
        }),
        pagination: {
          ...this.state.pagination,
          length: this.state.pagination.length as number - 1
        }
      })
    })
  }
  
  public openBookDetails(bookId: string): void {
    if (bookId.length > 0) {
      this.setState({
        favoritesDetails: !this.state.favoritesDetails,
        favoritesDetailsId: bookId
      })
    } else {
      this.setState({
        favoritesDetails: !this.state.favoritesDetails
      })
    }
  }

  public favoritesDeleteModal(bookId: string) {
    if (bookId.length > 0) {
      this.setState({
        favoritesDeleteModal: !this.state.favoritesDeleteModal,
        favoritesDeleteId: bookId
      })
    } else {
      this.setState({
        favoritesDeleteModal: !this.state.favoritesDeleteModal
      })
    }
  }

  render() {
    return (
      <div className="container favoritesComponent">
        <ReactModal
        isOpen={this.state.favoritesDetails as boolean}
        style={customStyles}
        contentLabel="Book's details"
        >
          <FavoritesDetailsModal
            book={this.state.books.filter(book => {
              return book._id === this.state.favoritesDetailsId;
            })}
            close={this.openBookDetails}
          />
        </ReactModal>

        <ReactModal
        isOpen={this.state.favoritesDeleteModal as boolean}
        style={customStyles}
        contentLabel="Delete book modal"
        >
          <FavoritesDeleteModal
            book={this.state.books.filter(book => {
              return book._id === this.state.favoritesDeleteId;
            })}
            delete={this.deleteBookFromFavorites}
            close={this.favoritesDeleteModal}
          />
        </ReactModal>

        <div className="input-field">
            <input type="text" id="text" 
            onChange={event => this.onSearchFieldChange.next(event.target.value)}
            />
            <label htmlFor="text">Seaarch field</label>
        </div>
        <p className="favoritesText">Favorites: </p>
        <ul className="book-card">
        { this.state.books.length > 0
          ? this.state.books.map((book) => {
            return (
            <li className="row book-element" key={book._id}>
              <img src={book.image as string} alt="book" className="book-image col s3" />
              <p className="col s6">
                <b>
                  {book.title}
                </b>
              </p>
              <p className="description  col s7">
                <b>Categories:</b>
                {(book.categories_list as CategoryAuthor[]).length > 0
                ? (book.categories_list as CategoryAuthor[]).map(category => {
                  return (
                    <span className="chip" key={category._id}>{category.name}</span>
                  )
                })
                : <span className='chip'>unknown</span>}
                <br />
                <b>Authors:</b>
                {(book.authors_list as CategoryAuthor[]).length > 0
                ? (book.authors_list as CategoryAuthor[]).map(author => {
                  return (
                    <span className="chip" key={author._id}>{author.name}</span>
                  )
                })
                : <span className='chip'>unknown</span>}
              </p>
              <div className="col s2 center btn-section">
                <button className="btn green"
                  onClick={() => this.openBookDetails(book._id as string)}
                >
                  Details
                </button>
                <button className="btn red"
                  onClick={() => {this.favoritesDeleteModal(book._id as string)}}
                >
                  <i className="material-icons">
                    delete
                  </i>
                </button>
              </div>
            </li>
            )
          })
          : <h3>Your list is empty</h3> }
          {this.state.pagination.length as number > 0
          ? <Pagination
          pageSize={this.state.pagination.pageSize}
          total={this.state.pagination.length}
          onChange = {(current, pageSize) => {
            this.setState({
              pagination: {
                ...this.state.pagination,
                pageIndex: current - 1,
                pageSize
              }
            }, this.componentDidMount)
          }}
          />
          : null}
        </ul>
      </div>
    )
  }
}