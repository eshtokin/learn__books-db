import { Component, OnInit } from '@angular/core';
import { GoogleBooks } from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-google-book',
  templateUrl: './google-book.component.html',
  styleUrls: ['./google-book.component.scss']
})
export class GoogleBookComponent implements OnInit {

  public searchString: string = this.googleBooks.getPageInfo().serchResult;
  public listOfBook: any = this.googleBooks.getPageInfo().currentItems;
  public currentPage: number = this.googleBooks.getPageInfo().currentPage;
  public arrayBookInDB: any = [];

  public searchStringUpdate = new Subject<string>();

  constructor(
    private googleBooks: GoogleBooks,
    private booksService: BookService
    ) {
      this.searchStringUpdate.pipe(
        debounceTime(500)
      ).subscribe(value => {
        if (this.searchString.length > 0) {
          this.searchForBook(value, {startIndex: 0, maxResults: 10});
        }
      });
    }

  ngOnInit() {}

  public searchForBook(searchString: string, configForBookReq: {startIndex: number, maxResults: number}) {
    this.googleBooks.searchForBook(searchString, configForBookReq)
    .then((result: any) => {
      this.listOfBook = result;
    });
    this.currentPage  = configForBookReq.startIndex;
  }

  public changePage(page: number) {
    this.searchForBook( this.searchString, {startIndex: page * 10, maxResults: 10});
    this.currentPage = page;
  }
}
