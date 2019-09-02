import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import { UserInfo } from 'src/app/service/user-info.service';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/pagination.model';
import { MatDialog } from '@angular/material';
import { AddBookModalComponent } from '../../shared/book/add-book-modal/add-book-modal.component';

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.scss']
})
export class BooksManagerComponent implements OnInit {
  public editeMode = false;
  public books: Book[]; // All items from db
  public paginationParams: Pagination = {
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0,
    length: 0
  };
  public previousBtn;
  public nextBtn;
  public paginatorOption: {
    length: number,
    pageIndex: number,
    pageSize: number
  };

  constructor(
    private userInfo: UserInfo,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  show(pageEvent) {
    this.paginationParams = pageEvent;
    this.getBooks();
    return pageEvent;
  }

  public editeModeToggle(): void {
    this.editeMode = !this.editeMode;
  }

  public getBooks(): void {
    this.bookService.getAllBooks(this.paginationParams)
      .then((el: any) => {
        this.books = el.books;
        this.paginationParams.length = el.totalCount[0].count;
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
