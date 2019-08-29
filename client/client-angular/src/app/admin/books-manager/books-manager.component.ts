import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import { UserInfo } from 'src/app/service/user-info.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.scss']
})
export class BooksManagerComponent implements OnInit {
  public editeMode = false;
  public books: Book[]; // All items from db
  public pageOfItems: Book[]; // Items on the page
  public pageSize = 3;

  constructor(
    private userInfo: UserInfo,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.init();
  }

  public onChangePage(pageOfItems: Array<any>): void {
    this.pageOfItems = pageOfItems;
  }

  public editeModeToggle(): void {
    this.editeMode = !this.editeMode;
  }

  public init(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getAllBooks()
      .then((el: Book[]) => {
        this.books = el;
      });
  }
  public getFilteredBooks(data): void {
    // this.bookService.getSomeBooks(data)
    //   .then((list: Book[]) => {
        this.router.navigate(
          ['/gbooks/filter'],
          {
            queryParams: data
          }
      );
      //   this.books = list;
      // });
  }
}
