import React from 'react';
import { connect } from 'react-redux';
import { Book } from '../../models/book.model';
import { UserService } from '../../service/users.service';
import { BookService } from '../../service/books.service';
import { UserInfoService } from '../../service/user-info.service';
import { BookComponent } from '../BookComponent/BookComponent';
import Filter from '../FilterComponent/FilterComponent';
import * as actions from '../../store/actions/filteredBookAction';
import { PaginationEvent } from '../../models/pagination-event.model';
import PaginationComponent from '../PaginationComponent/pagination';
import './style.scss';

interface State {
  pagination: PaginationEvent;
  searchQuery: string;
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
        length: 0
      },
      searchQuery: ''
    }

    this.userInfoService = new UserInfoService()
    this.userService = new UserService();
    this.bookService = new BookService();

    this.addBookToFavorite = this.addBookToFavorite.bind(this);
    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);
    this.editeBook = this.editeBook.bind(this);
  }

  componentDidMount() {
    this.getSomeBooks()
  }
  
  public async getSomeBooks(): Promise<any> {
    const searchQuery = this.props.history.location.search;
    await this.setState({
      searchQuery
    });
    console.log(this.state.searchQuery);
    
    await this.props.getSomeBooks(searchQuery, this.state.pagination)
  }
  
  public deleteBookFromDB(book: Book) {
    this.props.deleteBook(book)
    this.getSomeBooks()
  }

  public addBookToFavorite(book: Book) {
    this.props.bookToFromFavorites(book);
  }

  public async editeBook(book: Book) {
    debugger
    await this.props.editeBook(book, this.state.searchQuery, this.state.pagination)
    await this.props.getSomeBooks(this.props.history.location.search, this.state.pagination)
  }

  render() {
    return (
      <div className="row">
        <Filter
          {...this.props.history}
          getSomeBooks={this.getSomeBooks.bind(this)}
        />
        <div className="col s10 filteredBookContent">
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
                  editeBook={this.editeBook}
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
    ...state.filteredBook
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    editeBook: (book: Book, searchString: string, pagination: PaginationEvent) => {
      dispatch(actions.editeBook(book));
      // dispatch(actions.getSomeBooks(searchString, getSomeBooks))
    },
    deleteBook: (book: Book) => {
      dispatch(actions.deleteBook(book))
    },
    bookToFromFavorites: (book: Book) => {
      dispatch(actions.addDelBookFromFavorite(book))
    },
    getSomeBooks: (searchString: string, pagination: PaginationEvent) => {
      dispatch(actions.getSomeBooks(searchString, pagination))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilteredBook)