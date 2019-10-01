import React from 'react';
import { connect } from 'react-redux';
import { Book } from '../../models/book.model';
import { BookComponent } from '../../shared/BookComponent/BookComponent';
import { BookService } from '../../service/books.service';
import { UserService } from '../../service/users.service';
import Filter from '../../shared/FilterComponent/FilterComponent';
import * as actions from '../../store/actions/bookManagerAction';
import { UserInfoService } from '../../service/user-info.service';
import { PaginationEvent } from '../../models/pagination-event.model';
import PaginationComponent from '../../shared/PaginationComponent/pagination';

interface State {
  pagination: PaginationEvent;
}

class BookManager extends React.Component<any, State>{
  public userService: UserService;
  public bookService: BookService;
  public userInfoService: UserInfoService;
  
  constructor(props: any) {
    super(props);

    this.state = {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        length: 0
      }
    }

    this.userService = new UserService();
    this.bookService = new BookService();
    this.userInfoService = new UserInfoService();

    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);
    this.addBookToFavorite = this.addBookToFavorite.bind(this);
    this.editeBookInDb = this.editeBookInDb.bind(this);
  }

  componentDidMount() {
    this.props.getAllBooks(this.state.pagination);
  }
  
  public deleteBookFromDB(book: Book) {
    this.props.deleteBookFromDB(book, this.state.pagination);
  }

  public addBookToFavorite(book: Book) {
    this.props.bookToFromFavorite(book);
  }

  public async editeBookInDb(book: Book) {
    await this.props.editeBook(book, this.state.pagination);
  }

  render() {
    return (
      <div className="row">
        <Filter
        {...this.props.history}
        getSomeBooks={()=> {}}
        />
        <div className="col s10">
        {this.props.bookAtPage.length > 0 ?
        this.props.bookAtPage.map((book: Book, index: number) => {
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
          : <h1>Loading ...</h1>}
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
              }, this.componentDidMount)
            }}
          />
        </div>
      </ div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    ...state.bookManager
  }
};

interface Props {
  getAllBooks: (pagination: PaginationEvent) => void;
  deleteBookFromDB: (book: Book, pagination: PaginationEvent) => void;
  bookToFromFavorite: (book: Book) => void;
  editeBook: (book: Book, pagination: PaginationEvent) => void;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllBooks: (pagination: PaginationEvent) => {
      dispatch(actions.getAllBooks(pagination))
    },
    deleteBookFromDB: (book: Book, pagination: PaginationEvent) => {
      dispatch(actions.deleteBookFromDb(book));
      dispatch(actions.getAllBooks(pagination));
    },
    bookToFromFavorite: (book: Book) => {
      dispatch(actions.addDelBookFromFavorite(book))
    },
    editeBook: (book: Book, pagination: PaginationEvent) => {
      dispatch(actions.editeBook(book));
      dispatch(actions.getAllBooks(pagination))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookManager)