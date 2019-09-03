import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo } from 'src/app/service/user-info.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.scss']
})
export class AddBookModalComponent {
  public book: Book = this.data.book;

  constructor(
    public confirmDialog: MatDialogRef<AddBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      book: Book,
      reloadPage: () => void
    },
    public userInfo: UserInfo
  ) {}

  public onNoClick(): void {
    this.confirmDialog.close();
  }

  public closeDialog() {
    this.data.reloadPage();
    this.confirmDialog.close();
  }
}
