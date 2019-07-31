import { Component, OnInit } from '@angular/core';
import { GoogleBooks } from '../../../service/google-books.service';
import { BookService } from '../../../service/books.service';
import { UserInfo } from '../../../service/user-info.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  searchString = 'The Last Wish';
  listOfBook: any = this.googleBooks.getPageInfo().currentItems;
  currentPage = this.googleBooks.getPageInfo().currentPage;

  constructor(
    private googleBooks: GoogleBooks,
    private booksService: BookService,
    private userInfo: UserInfo
    ) { }

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

  addBookToDB(book, user) {
    const newBook = {
      title: book.title.toLowerCase(),
      authors: book.authors.map(element => element.toLowerCase()),
      categories: book.categories ? book.categories.map(element => element.toLowerCase()) : [],
      description: book.description,
      image: book.imageLinks.thumbnail || '',
      pageCount: book.pageCount,
      printType: book.printType.toLowerCase(0),
      industryIdentifiers: [...book.industryIdentifiers]
    };
    this.booksService.addBookToDB(newBook, user);
  }
}
