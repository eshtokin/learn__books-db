import React, { Props } from 'react';
import GoogleBooks from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { Book } from '../../models/book.model';
import { BookComponent } from '../../shared/BookComponent/BookComponent';
import { Pagination } from '../../shared/Pagination/pagination';
// const Filter = React.lazy(() => import('../../shared/filter'))
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';


export class GoogleBook extends React.Component {
  public googleBooks: GoogleBooks;
  private bookService: BookService;
  public onSearchFieldChange: Subject<string>;

  constructor(
    props: Props<any>
    ) {
    super(props);
    this.googleBooks = new GoogleBooks(new BookService());
    this.bookService = new BookService();
    this.state = {
      listOfBook: [],
      paginationParams: []
    };
  
    this.onSearchFieldChange = new Subject<string>();
    this.onSearchFieldChange
    .pipe(debounceTime(500))
    .subscribe((value: string) => {
      if (value.length > 0) {
        this.googleBooks.searchForBook(value)
        .then(() => {
          this.setState({
            ...this.state,
            listOfBook: this.googleBooks.getPageInfo().currentItems
          })
        })
      }
    });

    this.paginationHandler = this.paginationHandler.bind(this);
    this.deleteBookFromDB = this.deleteBookFromDB.bind(this);
  }

  shouldComponentUpdate() {
    return true;
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

  render() {
    return (
      <div className="container">
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
                ddToDbBtn: false,
                addToFavoriteBtn: true
              }}
              deleteFromDB={this.deleteBookFromDB}
              addToFavorite={() => {}}
              editeBook={() => {}}
            />
            )
          })}
        
        <Pagination
          pageIndex={0}
          pageSize={5}
          length={5}
          // [length] = "paginationParams.length"
          // [pageSize] = "paginationParams.pageSize"
          // [pageSizeOptions] = "[3, 5, 7, 10]"
          // (page) = "paginationHandler($event)">
        />
      
      </div>
    )
  }
}