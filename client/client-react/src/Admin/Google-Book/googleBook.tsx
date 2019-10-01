import React from 'react';
import GoogleBooks from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { Book } from '../../models/book.model';
import { BookComponent } from '../../shared/BookComponent/BookComponent';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { connect } from 'react-redux';
import { setListOfBook, toggleFlagExistInDB } from '../../store/actions/googleBookAction';
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

    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);
    this.getBookFromGoogle = this.getBookFromGoogle.bind(this);
    this.addBookToDB = this.addBookToDB.bind(this);
  }

  public deleteBookFromDB(data: Book) {
    this.bookService.deleteBook(data)
  }
  
  public addBookToDB(book: Book) {
    const newBook: Book = {
      title: book.title,
      authors: book.authors,
      categories: book.categories || [],
      description: book.description,
      image: (book.imageLinks as any).thumbnail || '',
      pageCount: book.pageCount,
      printType: book.printType,
      industryIdentifiers: book.industryIdentifiers
    };
    
    this.props.toggleFlagExistInDB(book._id);
    this.bookService.addBookToDB(newBook)
  }


  public getBookFromGoogle(value: string) {
    this.googleBooks.searchForBook(value)
    .then((res) => {
      this.props.setListOfBook(res)
    })
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
              deleteFromDB={this.deleteBookFromDB}
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
    setListOfBook: (list: Book[]) => dispatch(setListOfBook(list)),
    toggleFlagExistInDB: (bookId: string) => dispatch(toggleFlagExistInDB(bookId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleBook)