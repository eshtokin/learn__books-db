import React from 'react';
import GoogleBooks from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { Book } from '../../models/book.model';
import { BookComponent } from '../../shared/BookComponent/BookComponent';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/googleBookAction';
import PaginationComponent from '../../shared/PaginationComponent/pagination';

interface State {
  searchField: string
}

class GoogleBook extends React.Component<any, State> {
  public googleBooks: GoogleBooks;
  private bookService: BookService;
  public onSearchFieldChange: Subject<string>;

  constructor(props: any) {
    super(props);
    this.googleBooks = new GoogleBooks(new BookService());
    this.bookService = new BookService();

    this.state = {
      searchField: ''
    };
  
    this.onSearchFieldChange = new Subject<string>();
    this.onSearchFieldChange
    .pipe(debounceTime(500))
    .subscribe((value: string) => {
      if (value.length > 0) {
        this.setState({
          searchField: value
        })
        this.getBookFromGoogle(value)
      }
    });

    this.getBookFromGoogle = this.getBookFromGoogle.bind(this);
    this.addBookToDB = this.addBookToDB.bind(this);
  }
  
  public addBookToDB(book: Book) {
    this.props.addBookToDb(book);
  }


  public getBookFromGoogle(value: string) {
    this.props.getBooksByValue(value)
  }

  render() {
    return (
      <div className="container center">
        <div>
          <label> Search field
            <input id="search" type="text" className="validate"
            onChange={event => this.onSearchFieldChange.next(event.target.value)}
            />
          </label>
        </div>
        {this.props.listOfBook.map((book: Book, index: number) => {
          return (
            <BookComponent
              key={index}
              book={book}
              buttonStatus={{
                editeBtn: false,
                deleteBtn: false,
                ddToDbBtn: this.props.role === 1,
                addToFavoriteBtn: false
              }}
              deleteFromDB={() => {}}
              addToFavorite={() => {}}
              editeBook={() => {}}
              addBookToDB={this.addBookToDB}
            />
            )
          })}
        <PaginationComponent
          pagination={this.googleBooks.getPageInfo().paginationParams}
          onPageSizeChange={(pageSize: number) => {
            this.googleBooks.getPageInfo().paginationParams.pageSize = pageSize;
            this.getBookFromGoogle(this.state.searchField)
          }}
          callback={(current, pageSize) => {
            this.googleBooks.getPageInfo().paginationParams.pageIndex = current -1;
            this.googleBooks.getPageInfo().paginationParams.pageSize = pageSize;
            this.getBookFromGoogle(this.state.searchField)
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    ...state.googleBook,
    ...state.authentificatedInfo
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getBooksByValue: (value: string) =>
      dispatch(actions.getBookByValue(value)),
    addBookToDb: (book: Book) =>
      dispatch(actions.addBookToDb(book)),
    // deleteBookFromDb: (book: Book) =>
    //   dispatch(actions.deleteBookFromDb(book)),
    toggleFlagExistInDB: (bookId: string) =>
      dispatch(actions.toggleFlagExistInDB(bookId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleBook)