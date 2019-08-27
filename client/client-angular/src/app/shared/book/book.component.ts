import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { UserInfo } from 'src/app/service/user-info.service';
import { BookService } from 'src/app/service/books.service';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { BookEditeModalComponent } from './book-edite-modal/book-edite-modal.component';

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

  constructor(
    public userInfo: UserInfo,
    public bookService: BookService,
    public dialog: MatDialog
  ) {
    this.bookImage = '';
  }

  ngOnInit() {
    this.bookImage = this.book.imageLinks ? this.book.imageLinks.thumbnail : this.book.image;
  }

  public addBookToFavorite(book: Book) {
    this.bookService.addBookToDB(book,  this.userInfo.getCurrentUser());
  }

  public addBookToDB(book: Book, user: User) {
    const newBook: Book = {
      title: book.title, // .toLowerCase()
      authors: book.authors, // .map(element => element.toLowerCase())
      categories: book.categories || [], // ? book.categories.map(element => element.toLowerCase()) :
      description: book.description,
      image: book.imageLinks.thumbnail || '',
      pageCount: book.pageCount,
      printType: book.printType, // .toLowerCase()
      industryIdentifiers: [...book.industryIdentifiers]
    };
    this.bookService.addBookToDB(newBook, user);
  }

  public deleteBook(book: Book): void {
    this.bookService.deleteBook(book)
    .then(() => {
      this.reloadPage();
    });
  }

  public chooseEditeBook(book) {
    const editeFormDialog = this.dialog.open(BookEditeModalComponent, {
      data: {
        book,
        reloadPage: this.reloadPage
      }
    });
    editeFormDialog.afterClosed().subscribe(result => {});
  }

  public checkEditAccess(): boolean {
    return this.userInfo.getStatus() && this.buttonStatus.editeBtn;
  }
}
