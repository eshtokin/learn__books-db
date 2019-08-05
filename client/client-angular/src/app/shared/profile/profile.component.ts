import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/service/user-info.service';
import { BookService } from 'src/app/service/books.service';
import { Book } from 'src/app/models/book.model';
import { UserService } from 'src/app/service/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  books: Book[];
  booksId: string[];
  user: User;

  constructor(
    private userInfo: UserInfo,
    private bookService: BookService,
    private userService: UserService
  ) { }


  deleteBookFromProfile(book) {
    const userId = this.userInfo.getCurrentUser().id;
    const bookId = book._id;
    const books = [];

    this.userService.getUser(userId)
    .then(data => {
      data.books.forEach(id => {
        if (bookId !== id) {
          books.push(id);
        }
      });
      this.user = data;
      this.user.books = books;
      console.log(this.user);

      this.userService.edit(userId, this.user)
      .then(res => {
        this.init();
      });
    });
  }

  init() {
    this.userService.getUser(this.userInfo.getCurrentUser().id)
    .then(user => {
      if (user.books.length > 0) {
        this.userService.getUserBooks(user.books)
        .then(books => {
          this.books = books;
        });
      }
      if (user.books.length === 0) {
        this.books = [];
      }
    });
  }

  ngOnInit() {
    this.init();
  }
}
