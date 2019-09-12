import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/users.service';
import { PaginationEvent } from 'src/app/models/pagination-event.model';

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.scss']
})
export class BooksManagerComponent implements OnInit {
  public books: Book[];
  public paginationParams: PaginationEvent;

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private router: Router
  ) {
    this.paginationParams = {
      pageIndex: 0,
      pageSize: 5,
      previousPageIndex: 0,
      length: 0
    };
  }

  ngOnInit() {
    this.getBooks();
  }

  public paginationHandler(pageEvent: PaginationEvent): PaginationEvent {
    this.paginationParams = pageEvent;
    this.getBooks();
    return pageEvent;
  }

  public getBooks(): void {
    this.bookService.getAllBooks(this.paginationParams)
      .then((el) => {
        this.userService.getUserFavoriteBooks()
          .then(favoriteBooks => {
            this.books = (el.listOfItem as Book[]).map(book => {
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
