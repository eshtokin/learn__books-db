import { Component, OnInit } from '@angular/core';
import { GoogleBooks } from '../../service/google-books.service';
import { BookService } from '../../service/books.service';
import { UserInfo } from '../../service/user-info.service';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public searchString: string;
  public listOfBook: any = this.googleBooks.getPageInfo().currentItems;
  public currentPage: number = this.googleBooks.getPageInfo().currentPage;

  constructor(
    private googleBooks: GoogleBooks,
    private booksService: BookService,
    private userInfo: UserInfo // use in template
    ) { }

  ngOnInit() {
  }

  public searchForBook(searchString: string, configForBookReq: {startIndex: number, maxResults: number}) {
    this.googleBooks.searchForBook(searchString, configForBookReq);
    this.currentPage  = configForBookReq.startIndex;
  }

  public changePage(page: number) {
    this.searchForBook( this.searchString, {startIndex: page * 10, maxResults: 10});
    this.currentPage = page;
  }
}
