import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.scss']
})
export class FavoritesModalComponent {
  public book = this.data.book;
  public allBooks = this.data.allBooks;
  public user = this.data.user;

  constructor(
    public dialogRef: MatDialogRef<FavoritesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteBook() {
    const restOfBook = [];
    this.data.allBooks.forEach(book => {
      if (book._id !== this.data.book._id) {
        restOfBook.push(book._id);
      }
    });
    this.user.books = restOfBook;
    this.data.delete(this.user);
    this.dialogRef.close();
  }
}
