import React from 'react';
import GoogleBooks from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { Book } from '../../models/book.model';
import { BookComponent } from '../../shared/BookComponent/BookComponent';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { connect } from 'react-redux';
import { setListOfBook } from '../../store/actions/googleBookAction';

interface State {
  listOfBook: Book[],
  paginationParams: [];
  searchField: string
}

class GoogleBook extends React.Component<any, any> {
  public googleBooks: GoogleBooks;
  private bookService: BookService;
  public onSearchFieldChange: Subject<string>;

  constructor(props: any) {
    super(props);
    this.googleBooks = new GoogleBooks(new BookService());
    this.bookService = new BookService();

    this.state = {
      paginationParams: [],
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

    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);
    this.getBookFromGoogle = this.getBookFromGoogle.bind(this)
  }

  public deleteBookFromDB(data: Book) {
    this.bookService.deleteBook(data)
  }

  public getBookFromGoogle(value: string) {
    this.googleBooks.searchForBook(value)
    .then((res) => {
      this.props.setListOfBook(res)
    })
  }

  onShowSizeChange = (current: number, pageSize: number) => {
    console.log(current);
    // this.setState({ pageSize });
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
                ddToDbBtn: true,
                addToFavoriteBtn: false
              }}
              deleteFromDB={this.deleteBookFromDB}
              addToFavorite={() => {}}
              editeBook={() => {}}
            />
            )
          })}
        
        <Pagination
          showSizeChanger
          pageSize={10}
          defaultCurrent={1}
          total={this.googleBooks.getPageInfo().paginationParams.length}
          onChange = {(current, pageSize) => {
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
    ...state.googleBookReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setListOfBook: (list: Book[]) => dispatch(setListOfBook(list)) 
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleBook)