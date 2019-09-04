import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import { UserInfo } from 'src/app/service/user-info.service';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/pagination.model';
import { UserService } from 'src/app/service/users.service';

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.scss']
})
export class BooksManagerComponent implements OnInit {
  public books: Book[];
  public paginationParams: Pagination = {
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0,
    length: 0
  };

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  show(pageEvent) {
    this.paginationParams = pageEvent;
    this.getBooks();
    return pageEvent;
  }

  public getBooks(): void {
    this.bookService.getAllBooks(this.paginationParams)
    .then((el: any) => {
      this.userService.getUserFavoriteBooks()
      .then(favoriteBooks => {
        this.books = el.books.map(book => {
          return {
            ...book,
            inFavorite: favoriteBooks.indexOf(book._id) === -1 ? false : true
          };
        });
        this.paginationParams.length = el.totalCount[0].count;
      });
    });
  }

  public getFilteredBooks(data): void {
    this.router.navigate(
      ['/filtered'],
      {
        queryParams: data
      }
    );
  }
}
