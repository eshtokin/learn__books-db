import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo } from 'src/app/service/user-info.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-delete-modal',
  templateUrl: './book-delete-modal.component.html',
  styleUrls: ['./book-delete-modal.component.scss']
})
export class BookDeleteModalComponent {
  public book: Book = this.data.book;

  constructor(
    public confirmDialog: MatDialogRef<BookDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      book: Book,
      deleteBook: (book) => void,
      reloadPage: () => void
    },
    public userInfo: UserInfo
  ) {}

  public delete() {
    this.data.deleteBook(this.book);
    this.confirmDialog.close();
    this.data.reloadPage();
  }
}
