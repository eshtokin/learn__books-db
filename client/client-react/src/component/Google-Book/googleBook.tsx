import React from 'react';
import {GoogleBooks} from '../../service/google-books.service';
import GoogleBookService from '../../service/google-books.service';
import { Book } from '../../models/book.model';
import { BookComponent } from '../../shared/BookComponent/BookComponent';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/googleBookAction';
import PaginationComponent from '../../shared/PaginationComponent/pagination';
import { GoogleBookState } from '../../store/reducers/googleBookReducer';
import { AuthentificationState } from '../../store/reducers/authentificationInfoReducer';
import { Store } from '../../store/store';

interface Props {
  store: GoogleBookState;
  authInfo: AuthentificationState;
  getBooksByValue: (value: string) => void;
  addBookToDb: (book: Book) => void;
  toggleFlagExistInDB: (bookId: string) => void;
}

interface State {
  searchField: string
}

class GoogleBook extends React.Component<Props, State> {
  public googleBooks: GoogleBooks;
  public onSearchFieldChange: Subject<string>;

  constructor(props: Props) {
    super(props);
    this.googleBooks = GoogleBookService;

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
        {this.props.store.listOfBook.map((book: Book, index: number) => {
          return (
            <BookComponent
              key={index}
              book={book}
              buttonStatus={{
                editeBtn: false,
                deleteBtn: false,
                ddToDbBtn: this.props.authInfo.role === 1,
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

const mapStateToProps = (state: Store) => {
  return {
    store: {...state.googleBook},
    authInfo: {...state.authentificatedInfo}
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getBooksByValue: (value: string) =>
      dispatch(actions.getBookByValue(value)),
    addBookToDb: (book: Book) =>
      dispatch(actions.addBookToDb(book)),
    toggleFlagExistInDB: (bookId: string) =>
      dispatch(actions.toggleFlagExistInDB(bookId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleBook)