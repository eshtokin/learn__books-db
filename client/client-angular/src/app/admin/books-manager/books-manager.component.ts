import { Component, OnInit, SecurityContext } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import { UserInfo } from 'src/app/service/user-info.service';
import { CategoryAuthor } from 'src/app/models/category-author.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.scss']
})
export class BooksManagerComponent implements OnInit {
  public editeMode = false;
  public books: Book[];

  constructor(
    private userInfo: UserInfo,
    private bookService: BookService,
  ) { }

  ngOnInit() {
    this.init();
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
  public getFilteredBooks(data) {
    this.bookService.getSomeBooks(data)
        .then((list: Book[]) => {
          this.books = list;
        });
  }
}
