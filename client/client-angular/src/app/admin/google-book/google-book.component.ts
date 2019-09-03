import { Component, OnInit } from '@angular/core';
import { GoogleBooks } from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { UserInfo } from '../../service/user-info.service';

@Component({
  selector: 'app-google-book',
  templateUrl: './google-book.component.html',
  styleUrls: ['./google-book.component.scss']
})
export class GoogleBookComponent implements OnInit {

  public searchString: string;
  public listOfBook: any = this.googleBooks.getPageInfo().currentItems;
  public currentPage: number = this.googleBooks.getPageInfo().currentPage;

  constructor(
    private googleBooks: GoogleBooks,
    private booksService: BookService,
    private userInfo: UserInfo // use in template
    ) { }

  ngOnInit() {}

  public searchForBook(searchString: string, configForBookReq: {startIndex: number, maxResults: number}) {
    this.googleBooks.searchForBook(searchString, configForBookReq);
    this.currentPage  = configForBookReq.startIndex;
  }

  public changePage(page: number) {
    this.searchForBook( this.searchString, {startIndex: page * 10, maxResults: 10});
    this.currentPage = page;
  }
}
