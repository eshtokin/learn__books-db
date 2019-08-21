import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/service/user-info.service';
import { Book } from 'src/app/models/book.model';
import { UserService } from 'src/app/service/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public books: Book[];
  public booksId: string[];
  public user: User = this.userInfo.getCurrentUser();

  constructor(
    private userInfo: UserInfo,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUser(this.userInfo.getCurrentUser().id)
    .then((user: User) => {
      this.user = user;

      if (user.books.length > 0) {
        this.userService.getUserBooks(user.books as string[])
        .then((books: Book[]) => {
          this.books = books;
        });
      }
      if (user.books.length === 0) {
        this.books = [];
      }
    });
  }
}
