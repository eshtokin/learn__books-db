import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BookService } from 'src/app/services/books.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { PaginationEvent } from 'src/app/models/pagination-event.model';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.scss']
})
export class BooksManagerComponent implements OnInit {
  public books: Book[];
  public paginationParams: PaginationEvent;
  mymessage: string;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private router: Router,
    private messageService: ErrorService
  ) {
    this.paginationParams = {
      pageIndex: 0,
      pageSize: 5,
      previousPageIndex: 0,
      length: 0
    };
    // this.messageService.updateMessage('Hello! From AppComponent 11111!!');
  }

  ngOnInit() {
    this.getBooks();
  }
  public paginationHandler(pageEvent: PaginationEvent): PaginationEvent {
    this.paginationParams = pageEvent;
    this.getBooks();
    return pageEvent;
  }

  public async getBooks(): Promise<void> {
    const responseWithBooks = await this.bookService.getAllBooks(this.paginationParams);
    const favoriteBooks = await this.userService.getUserFavoriteBooks();
    // await this.bookService.getAllBooks(this.paginationParams).then( data => {
    //   if (data.status) {
    //     this.messageService.updateMessage(data.message);
    //     return ;
    //   }
    //   responseWithBooks = data;
    // });

    this.books = responseWithBooks.listOfItem.map(book => {
      return {
        ...book,
        inFavorite: favoriteBooks.length
        ? favoriteBooks.indexOf(book._id) === -1 ? false : true
        : null
      };
    });
    this.paginationParams.length = responseWithBooks.totalCount[0].count;

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
