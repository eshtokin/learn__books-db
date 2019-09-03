import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import { UserInfo } from 'src/app/service/user-info.service';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/pagination.model';
import { MatDialog } from '@angular/material';
import { AddBookModalComponent } from '../../shared/book/book-add-modal/add-book-modal.component';
import { FavoriteService } from 'src/app/service/favorite.service';

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.scss']
})
export class BooksManagerComponent implements OnInit {
  public books: Book[]; // All items from db
  public paginationParams: Pagination = {
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0,
    length: 0
  };
  public favoritesId: string[];

  constructor(
    private userInfo: UserInfo,
    public favoriteService: FavoriteService,
    private bookService: BookService,
    private router: Router
  ) {
    this.favoriteService = new FavoriteService();
   }

  ngOnInit() {
    this.getBooks();
  }

  show(pageEvent) {
    this.paginationParams = pageEvent;
    this.getBooks();
    return pageEvent;
  }

  public getBooks(): void {
    this.bookService.getAllBooks(this.paginationParams)
      .then((el: any) => {
        this.favoritesId = this.favoriteService.favoritesBook;
        this.books = el.books.map(book => {
          return {
            ...book,
            inFavorite: this.favoritesId.indexOf(book._id) === -1 ? false : true
          };
        });
        this.paginationParams.length = el.totalCount[0].count;
      });
  }

  public getFilteredBooks(data): void {
    this.router.navigate(
      ['/filtered'],
      {
        queryParams: data
      }
    );
  }
}
