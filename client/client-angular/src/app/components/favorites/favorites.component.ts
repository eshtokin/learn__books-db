import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/services/user-info.service';
import { UserService } from 'src/app/services/users.service';
import { Book } from 'src/app/models/book.model';
import {MatDialog} from '@angular/material/dialog';
import { FavoritesModalComponent } from './favorites-modal/favorites-modal.component';
import { User } from 'src/app/models/user.model';
import { FavoritesDeleteModalComponent } from './favorite-delete-modal/favorites-delete-modal.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PaginationEvent } from 'src/app/models/pagination-event.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public books: Book[] = [];
  public user: User;
  public pageOfItems: Book[];
  public searchField: string;
  public onSearchFieldChange: Subject<string>;
  public paginationParams: PaginationEvent = {
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0,
    length: 0
  };

  constructor(
    private userInfo: UserInfo,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.onSearchFieldChange = new Subject<string>();
    this.onSearchFieldChange
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.searchFromFavorites();
      });
  }

  ngOnInit() {
    this.userService.getUser(this.userInfo.getCurrentUser().id)
    .then((user: User) => {
      this.user = user;
      if (user.books.length > 0) {
        this.userService.getUserBooks(user.books as string[], this.paginationParams)
        .then(data => { // make response type
          this.books = data[0].listOfItem;
          this.paginationParams.length = data[0].totalCount[0].count;
        });
      }
      if (user.books.length === 0) {
        this.books = [];
      }
    });
  }

  public paginationHandler(pageEvent: PaginationEvent): PaginationEvent {
    this.paginationParams = pageEvent;
    if (this.searchField && this.searchField.length) {
      this.searchFromFavorites();
      return pageEvent;
    }
    this.ngOnInit();
    return pageEvent;
  }

  public openDialog(book: Book): void {
    this.dialog.open(FavoritesModalComponent, {
      data: {
        book
      }
    });
  }

  public deleteDialog(book: Book): void {
   this.dialog.open(FavoritesDeleteModalComponent, {
      data: {
        book,
        allBooks: this.books,
        user: this.user,
        delete: this.deleteBookFromFavorite.bind(this)
      }
    });
  }

  public deleteBookFromFavorite(user: User): void {
    this.userService.edit(this.user._id, user)
    .then(() => {
      this.ngOnInit();
    });
  }

  public searchFromFavorites(): void {
    this.userService.getUser(this.userInfo.getCurrentUser().id)
    .then((user: User) => {
      this.user = user;
      if (user.books.length > 0) {
        this.userService.getUserBooks(user.books as string[], this.paginationParams, this.searchField)
        .then(books => {
          this.books = books[0].listOfItem;
          this.paginationParams.length = books[0].totalCount[0].count;
        });
      }
      if (user.books.length === 0) {
        this.books = [];
      }
    });
  }
}
