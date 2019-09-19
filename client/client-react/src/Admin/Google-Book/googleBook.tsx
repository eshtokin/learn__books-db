import React from 'react';
import GoogleBooks from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { Book } from '../../models/book.model';
import { BookComponent } from '../../shared/BookComponent/BookComponent';
// import { Pagination } from '../../shared/Pagination/pagination';
// const Filter = React.lazy(() => import('../../shared/filter'))
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

// import Select from 'rc-select';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
// import 'rc-select/assets/index.less';

interface State {
  listOfBook: Book[],
  paginationParams: [];
  searchField: string
}

export class GoogleBook extends React.Component<any, State> {
  public googleBooks: GoogleBooks;
  private bookService: BookService;
  public onSearchFieldChange: Subject<string>;

  constructor(props: any) {
    super(props);
    this.googleBooks = new GoogleBooks(new BookService());
    this.bookService = new BookService();

    this.state = {
      listOfBook: [],
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

    this.paginationHandler = this.paginationHandler.bind(this);
    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);
    this.getBookFromGoogle = this.getBookFromGoogle.bind(this)
  }


  public paginationHandler(event: any) {
    console.log(event.target);
  }

  public deleteBookFromDB(data: Book) {
    this.bookService.deleteBook(data)
    .then((response) => {
      console.log(response)
    })
  }

  public getBookFromGoogle(value: string) {
    this.googleBooks.searchForBook(value)
    .then(() => {
      console.log('Gbooks', this.googleBooks.getPageInfo());
        
      this.setState({
        ...this.state,
        listOfBook: this.googleBooks.getPageInfo().currentItems
      })
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
        {(this.state as any).listOfBook.map((book: Book, index: number) => {
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