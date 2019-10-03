import { Component, OnInit } from '@angular/core';
import { GoogleBooks } from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PaginationEvent } from 'src/app/models/pagination-event.model';
import { Book } from 'src/app/models/book.model';
import { UserInfo } from 'src/app/service/user-info.service';

@Component({
  selector: 'app-google-book',
  templateUrl: './google-book.component.html',
  styleUrls: ['./google-book.component.scss']
})
export class GoogleBookComponent implements OnInit {

  public searchString: string;
  public searchStringUpdate: Subject<string>;
  public listOfBook: Book[];
  public paginationParams: PaginationEvent;

  constructor(
    private googleBooks: GoogleBooks,
    public userInfo: UserInfo
    ) {
      this.searchStringUpdate = new Subject<string>();
      this.searchString = this.googleBooks.getPageInfo().searchResult;
      this.listOfBook = this.googleBooks.getPageInfo().currentItems;
      this.paginationParams = this.googleBooks.getPageInfo().paginationParams;

      this.searchStringUpdate.pipe(
        debounceTime(500)
      ).subscribe(value => {
        if (this.searchString.length > 0) {
          this.searchForBook(value);
        }
      });
    }

  ngOnInit() {}

  public searchForBook(searchString: string): void {
    this.googleBooks.searchForBook(searchString)
    .then((result: any) => { // make
      this.listOfBook = result;
    });
  }

  public paginationHandler(eventPage: PaginationEvent): PaginationEvent {
    this.googleBooks.getPageInfo().paginationParams = eventPage;

    if (this.searchString.length > 0) {
      this.searchForBook( this.searchString);
    }
    return eventPage;
  }
}
