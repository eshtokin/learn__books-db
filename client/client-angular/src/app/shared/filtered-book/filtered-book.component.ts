import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/books.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-filtered-book',
  templateUrl: './filtered-book.component.html',
  styleUrls: ['./filtered-book.component.scss']
})
export class FilteredBookComponent implements OnInit {
  data;
  books: Book[];

  constructor(
    private activeRoute: ActivatedRoute,
    private bookService: BookService
  ) { }

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
    .then(data => {
      this.books = data[0].books;
      this.data.pagination.length = data[0].totalCount[0].count;
    });
  }

  public paginationHandler(pageEvent) {
    this.data.pagination = pageEvent;
    this.getSomeBooks();
    return pageEvent;
  }
}
