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
      title: linkParams.title
    };
    this.bookService.getSomeBooks(this.data)
    .then(books => {
      this.books = books;
      console.log('response:', this.books);
    });
  }

}
