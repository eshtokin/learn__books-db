import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/service/user-info.service';
import { UserService } from 'src/app/service/users.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(
    private userInfo: UserInfo,
    private userService: UserService
  ) { }

  books: Book[] = [];

  some() {
    console.log('click');
  }

  ngOnInit() {
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

}
