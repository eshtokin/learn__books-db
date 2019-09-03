import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/books.service';
import { Book } from 'src/app/models/book.model';
import { UserService } from 'src/app/service/users.service';
import { UserInfo } from 'src/app/service/user-info.service';
import { Pagination } from 'src/app/models/pagination.model';

@Component({
  selector: 'app-filtered-book',
  templateUrl: './filtered-book.component.html',
  styleUrls: ['./filtered-book.component.scss']
})
export class FilteredBookComponent implements OnInit {
  public data;
  public books: Book[];
  public favoritesId: string[];

  constructor(
    private activeRoute: ActivatedRoute,
    private userInfo: UserInfo,
    private userService: UserService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    const linkParams = this.activeRoute.snapshot.queryParams;
    this.data = {
      'authors[]': linkParams.authors,
      'categories[]': linkParams.categories,
      title: linkParams.title,
      pagination: {
        pageIndex: 0,
        pageSize: 5,
        length: 0,
        previousPageIndex: 0
      }
    };
    this.getSomeBooks();
  }

  public getSomeBooks() {
    this.bookService.getSomeBooks(this.data)
    .then((el: any) => {
      this.userService.getUser(this.userInfo.getCurrentUser().id)
      .then(user => {
        this.favoritesId = user.books;
      })
      .then(() => {
        this.books = el[0].books.map(book => {
          return {
            ...book,
            inFavorite: this.favoritesId.indexOf(book._id) === -1 ? false : true
          };
        });
        this.data.pagination.length = el[0].totalCount[0].count;
      });
    });
  }

  public paginationHandler(pageEvent) {
    this.data.pagination = pageEvent;
    this.getSomeBooks();
    return pageEvent;
  }

  show(pageEvent) {
    this.data.pagination = pageEvent;
    this.getSomeBooks();
    return pageEvent;
  }

  public getBooks(): void {
    this.bookService.getAllBooks(this.data.pagination)
    .then((el: any) => {
      this.userService.getUser(this.userInfo.getCurrentUser().id)
      .then(user => {
        this.favoritesId = user.books;
      })
      .then(() => {
        this.books = el.books.map(book => {
          return {
            ...book,
            inFavorite: this.favoritesId.indexOf(book._id) === -1 ? false : true
          };
        });
        this.data.pagination.length = el.totalCount[0].count;
      });
    });
  }

  public getFilteredBooks(data): void {
    this.router.navigate(
      ['/filtered'],
      {
        queryParams: data
      }
    )
    .then(() => {
      this.ngOnInit();
    });
  }
}
