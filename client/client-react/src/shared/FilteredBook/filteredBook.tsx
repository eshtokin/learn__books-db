import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { User } from '../../models/user.model';
import { Book } from '../../models/book.model';
import { UserService } from '../../service/users.service';
import { BookService } from '../../service/books.service';
import { UserInfoService } from '../../service/user-info.service';
import { BookComponent } from '../BookComponent/BookComponent';
import Filter from '../FilterComponent/FilterComponent';
import { setBook } from '../../store/actions/filteredBookAction';
import { PaginationEvent } from '../../models/pagination-event.model';
import PaginationComponent from '../PaginationComponent/pagination';
import './style.scss';

interface State {
  pagination: PaginationEvent;
}

class FilteredBook extends React.Component<any, State>{
  public userInfoService: UserInfoService;
  public userService: UserService;
  public bookService: BookService;

  constructor(props: any) {
    super(props);

    this.state = {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        length: 0,
        previousPageIndex: 0
      }
    }

    this.userInfoService = new UserInfoService()
    this.userService = new UserService();
    this.bookService = new BookService();

    this.addBookToFavorite = this.addBookToFavorite.bind(this);
    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);
    this.editeBookInDb = this.editeBookInDb.bind(this);
  }

  componentDidMount() {
    this.getSomeBooks()
  }
  
  public getSomeBooks(): void {
    const linkParams = queryString.parse(this.props.history.location.search);
    const data = {
      'authors[]': linkParams.authors as string[] || [],
      'categories[]': linkParams.categories as string[] || [],
      title: linkParams.title as string || '',
      pagination: this.state.pagination
    };
    let favoritesId: string | string[] = [];
    this.bookService.getSomeBooks(data)
    .then((el: any) => {

      this.userService.getUser((this.userInfoService.getCurrentUser() as User).id as string)
      .then((user: User) => {
        favoritesId = user.books as string[];
        const listOfBook = el[0].listOfItem.map((book: Book) => {
            return {
              ...book,
              inFavorite: (favoritesId as string[]).indexOf(book._id as string) === -1 ? false : true
            };
          })

        this.props.setBook(listOfBook)
        
        if (el[0].totalCount[0]) {
          this.setState({
            pagination: {
              ...this.state.pagination,
              length:  el[0].totalCount[0].count
            }
          })
        }
      });
    });
  }
  
  public deleteBookFromDB(book: Book) {
    this.bookService.deleteBook(book)
    .then(() => this.componentDidMount())
  }

  public addBookToFavorite(book: Book) {
    if (!book.inFavorite) {
      this.userService.addBookToProfile(book)
      .then(() => this.componentDidMount())
    } else {
      this.userService.getUser((this.userInfoService.getCurrentUser() as User).id as string)
      .then(user => {
        user.books = (user.books as string[]).filter(bookId => {
          return bookId !== book._id;
        })
        this.userService.edit(user._id, user)
        .then(() => this.componentDidMount())
      })
    }
    book.inFavorite = !book.inFavorite;
  }

  public editeBookInDb(book: Book) {
    this.bookService.updateBook(book)
    .then(() => {
      this.componentDidMount();
    })
  }

  render() {
    return (
      <div className="row">
        <Filter
          key={2}
          {...this.props.history}
          getSomeBooks={this.getSomeBooks.bind(this)}
        />
        <div className="col s8 filteredBookContent">
          {this.props.books.length > 0 ?
            this.props.books.map((book: Book, index: number) => {
              return (
                <BookComponent
                  key={index}
                  book={book}
                  buttonStatus={{
                    editeBtn: true,
                    deleteBtn: true,
                    ddToDbBtn: false,
                    addToFavoriteBtn: true
                  }}
                  deleteFromDB={this.deleteBookFromDB}
                  addToFavorite={this.addBookToFavorite}
                  editeBook={this.editeBookInDb}
                  addBookToDB={() => {}}
                />)
            })
            : <h1>No overlap...</h1>}
            <PaginationComponent
              pagination={this.state.pagination}
              onPageSizeChange={(pageSize: number) => {
                this.setState({
                  pagination: {
                    ...this.state.pagination,
                    pageSize
                  }
                }, this.componentDidMount)
              }}
              callback={(current, pageSize) => {
                this.setState({
                  pagination: {
                    ...this.state.pagination,
                    pageIndex: current - 1,
                    pageSize
                  }
                }, this.getSomeBooks)
              }}
            />
        </div>
      </ div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    ...state.filteredBookReducer
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setBook: (list: Book[]) => dispatch(setBook(list))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilteredBook)