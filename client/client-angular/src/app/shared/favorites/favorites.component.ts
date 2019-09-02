import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/service/user-info.service';
import { UserService } from 'src/app/service/users.service';
import { Book } from 'src/app/models/book.model';
import {MatDialog} from '@angular/material/dialog';
import { FavoritesModalComponent } from './favorites-modal/favorites-modal.component';
import { User } from 'src/app/models/user.model';
import { FavoritesDeleteModalComponent } from './favorite-delete-modal/favorites-delete-modal.component';
import { Pagination } from 'src/app/models/pagination.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public books: Book[] = []; // all book from favorite
  public user: User;
  public pageOfItems: Book[]; // book on page
  public searchField: string;
  public paginationParams: Pagination = {
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0,
    length: 0
  };

  constructor(
    private userInfo: UserInfo,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.getUser(this.userInfo.getCurrentUser().id)
    .then((data) => {
      this.user = data;
      return data;
    })
    .then((user: User) => {
      if (user.books.length > 0) {
        this.userService.getUserBooks(user.books as string[], this.paginationParams)
        .then(data => {
          console.log(data);
          this.books = data[0].books;
          this.paginationParams.length = data[0].totalCount[0].count;
        });
      }
      if (user.books.length === 0) {
        this.books = [];
      }
    });
  }

  public paginationHandler(pageEvent) {
    this.paginationParams = pageEvent;
    if (this.searchField && this.searchField.length) {
      this.searchFromFavorites();
      return pageEvent;
    }
    console.log(this.paginationParams);
    this.ngOnInit();
    return pageEvent;
  }

  public openDialog(book: Book): void {
    const dialogRef = this.dialog.open(FavoritesModalComponent, {
      data: {
        book
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  public deleteDialog(book: Book): void {
    const dialogRef = this.dialog.open(FavoritesDeleteModalComponent, {
      data: {
        book,
        allBooks: this.books,
        user: this.user,
        delete: this.deleteBookFromFavorite.bind(this)
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  public deleteBookFromFavorite(user: User) {
    this.userService.edit(this.user._id, user)
    .then(() => {
      this.ngOnInit();
    });
  }

  public searchFromFavorites() {
    this.userService.getUser(this.userInfo.getCurrentUser().id)
    .then((data) => {
      this.user = data;
      return data;
    })
    .then((user: User) => {
      if (user.books.length > 0) {
        this.userService.getUserBooks(user.books as string[], this.paginationParams, this.searchField)
        .then(books => {
          this.books = books[0].books;
          this.paginationParams.length = books[0].totalCount[0].count;
        });
      }
      if (user.books.length === 0) {
        this.books = [];
      }
    });
  }
}
