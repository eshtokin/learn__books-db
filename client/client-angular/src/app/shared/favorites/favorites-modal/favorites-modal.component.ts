import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.scss']
})
export class FavoritesModalComponent {
  public book: Book = this.data.book;
  public allBooks: Book[] = this.data.allBooks;
  public user: User = this.data.user;

  constructor(
    public dialogRef: MatDialogRef<FavoritesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      book: Book,
      allBooks: Book[],
      user: User,
      delete: (user: User) => void
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteBook() {
    const restOfBook = [];
    this.data.allBooks.forEach((book: Book) => {
      if (book._id !== this.data.book._id) {
        restOfBook.push(book._id);
      }
    });
    this.user.books = restOfBook;
    this.data.delete(this.user);
    this.dialogRef.close();
  }
}
