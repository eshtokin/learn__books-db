import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/service/user-info.service';
import { Book } from 'src/app/models/book.model';
import { UserService } from 'src/app/service/users.service';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditeModalComponent } from './profile-edite-modal/profile-edite-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public books: Book[];
  public booksId: string[];
  public user: User;

  constructor(
    private userInfo: UserInfo,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.getUser(this.userInfo.getCurrentUser().id)
    .then((user: User) => {
      this.user = user;
      if (user.books.length > 0) {
        this.userService.getUserBooks(user.books as string[], {pageIndex: 0, pageSize: 5})
        .then((data) => {
          this.books = data[0].listOfItem;
        });
      }
      if (user.books.length === 0) {
        this.books = [];
      }
    });

    this.user = this.userInfo.getCurrentUser();
  }

  public editeProfile(): void {
    this.dialog.open(ProfileEditeModalComponent, {
      data: {
        user: this.user,
        refresh: this.ngOnInit.bind(this)
      }
    });
  }
}
