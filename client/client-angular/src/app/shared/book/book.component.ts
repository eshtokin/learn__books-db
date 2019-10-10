import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { UserInfo } from 'src/app/services/user-info.service';
import { BookService } from 'src/app/services/books.service';
import { MatDialog } from '@angular/material/dialog';
import { BookEditeModalComponent } from './book-edite-modal/book-edite-modal.component';
import { BookDeleteModalComponent } from './book-delete-modal/book-delete-modal.component';
import { AddBookModalComponent } from './book-add-modal/add-book-modal.component';
import { UserService } from 'src/app/services/users.service';
import { BookDeleteFromFavModalComponent } from './book-delete-from-fav-modal/book-delete-from-fav-modal.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Input() buttonStatus: {
    editeBtn: boolean,
    deleteBtn: boolean,
    addToDbBtn: boolean,
    addToFavoriteBtn: boolean
  };
  @Input() reloadPage: () => void;

  public bookImage: string | ArrayBuffer;
  public bookExistInFavorites: boolean;

  constructor(
    public userInfo: UserInfo,
    public bookService: BookService,
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.bookImage = '';
  }

  ngOnInit() {
    this.bookImage = this.book.imageLinks ? this.book.imageLinks.thumbnail : this.book.image;
  }

  public async addBookToFavorite(book: Book) {
    const result = await this.userService.addBookToProfile(book);
    console.log(result)
    this.confirmDialog();
  }

  public addBookToDB(book: Book): void {
    this.book.inFavorite = true;

    const newBook: Book = {
      title: book.title,
      authors: book.authors,
      categories: book.categories || [],
      description: book.description,
      image: book.imageLinks.thumbnail || '',
      pageCount: book.pageCount,
      printType: book.printType,
      industryIdentifiers: book.industryIdentifiers
    };
    this.bookService.addBookToDB(newBook);
  }

  public deleteBook(book: Book): void {
    this.bookService.deleteBook(book)
    .then(() => {
      this.reloadPage();
    });
  }

  public chooseEditeBook(book): void {
    this.dialog.open(BookEditeModalComponent, {
      data: {
        book,
        reloadPage: this.reloadPage
      }
    });
  }

  public deleteDialog(book: Book): void {
    this.dialog.open(BookDeleteModalComponent, {
      data: {
        book,
        deleteBook: this.deleteBook.bind(this),
        reloadPage: this.reloadPage
      }
    });
  }

  public confirmDialog(): void {
    this.dialog.open(AddBookModalComponent, {
      data: {
        book: this.book,
        reloadPage: this.reloadPage
      }
    });
  }

  public deleteFromFavorites(): void {
    this.dialog.open(BookDeleteFromFavModalComponent, {
      data: {
        book: this.book,
        reloadPage: this.reloadPage
      }
    });
  }
}
