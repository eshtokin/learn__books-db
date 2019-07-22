import { Component, OnInit } from '@angular/core';
import { GoogleBooks } from '../service/google-books.service';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  searchString = '';
  listOfBook: any = this.googleBooks.getPageInfo().currentItems;
  currentPage = 0;

  constructor(private googleBooks: GoogleBooks) { }

  ngOnInit() {
  }

  searchForBook(searchString = this.searchString, configForBookReq) {
    this.googleBooks.searchForBook(searchString, configForBookReq);
    this.currentPage  = configForBookReq.startIndex;
  }

  changePage(page) {
    this.searchForBook( this.searchString, {startIndex: page * 10, maxResults: 10});
    this.currentPage = page;
  }

  show(book) {
    console.log(book);
  }
}
