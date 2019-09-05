import { Component, OnInit } from '@angular/core';
import { GoogleBooks } from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-google-book',
  templateUrl: './google-book.component.html',
  styleUrls: ['./google-book.component.scss']
})
export class GoogleBookComponent implements OnInit {

  public searchString: string = this.googleBooks.getPageInfo().serchResult;
  public searchStringUpdate = new Subject<string>();
  public listOfBook: any = this.googleBooks.getPageInfo().currentItems;
  public arrayBookInDB: any = [];
  public paginationParams = this.googleBooks.getPageInfo().paginationParams;

  constructor(
    private googleBooks: GoogleBooks,
    private booksService: BookService
    ) {
      this.searchStringUpdate.pipe(
        debounceTime(500)
      ).subscribe(value => {
        if (this.searchString.length > 0) {
          this.searchForBook(value);
        }
      });
    }

  ngOnInit() {}

  public searchForBook(searchString: string) {
    this.googleBooks.searchForBook(searchString)
    .then((result: any) => {
      this.listOfBook = result;
    });
  }

  public changePage(eventPage) {
    this.googleBooks.getPageInfo().paginationParams = eventPage;

    if (this.searchString.length > 0) {
      this.searchForBook( this.searchString);
    }
  }
}
