import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo } from 'src/app/service/user-info.service';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/users.service';

@Component({
  selector: 'app-book-delete-modal',
  templateUrl: './book-delete-from-fav-modal.component.html',
  styleUrls: ['./book-delete-from-fav-modal.component.scss']
})
export class BookDeleteFromFavModalComponent {
  public user: User;

  constructor(
    public confirmDialog: MatDialogRef<BookDeleteFromFavModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      book: Book,
      reloadPage: () => void
    },
    public userInfo: UserInfo,
    public userService: UserService
  ) {
    this.userService.getUser(this.userInfo.getCurrentUser().id)
    .then(user => {
      this.user = user;
    });
  }

  public delete() {
    const restOfBook = [];
    (this.user.books as string[]).forEach(book => {
      if (this.data.book._id !== book) {
        restOfBook.push(book);
      }
    });

    this.user.books = restOfBook;

    this.userService.edit(this.user._id, this.user)
    .then(() => {
      this.confirmDialog.close();
      this.data.reloadPage();
    });
  }
}
