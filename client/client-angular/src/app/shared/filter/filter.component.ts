import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { CategoryAuthor } from 'src/app/models/category-author.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() getFilteredBooks: (data) => void;
  @Input() getAllBooks: () => void;

  public authors: CategoryAuthor[];
  public categories: CategoryAuthor[];
  public filterData = {
    title: '',
    categories: new Set(),
    authors: new Set()
  };
  public searchField = '';

  public linkParams;

  constructor(
    private bookService: BookService,
    private activeRoute: ActivatedRoute,
  ) {
    this.bookService = new BookService();
  }

  ngOnInit() {
    this.linkParams = this.activeRoute.snapshot.queryParams;
    this.getAuthors();
    this.getCategories();
  }

  public getAuthors(): void {
    this.bookService.getAllAuthors()
      .then((author: CategoryAuthor[]) => {
        this.authors = author.map(author =>{
          return {
            ...author,
            checked: this.linkParams.hasOwnProperty('authors') ?
              this.linkParams.authors.indexOf(author._id) === -1 ? false : true
              : false
          }
        });
      })
  }

  public getCategories(): void {
    this.bookService.getAllCategories()
      .then((categories: CategoryAuthor[]) => {
        this.categories = categories.map(category => {
          return {
            ...category,
            checked: this.linkParams.hasOwnProperty('categories') ?
              this.linkParams.categories.indexOf(category._id) === -1 ? false : true
              : false
          }
        });
      });
  }

  public filtering(): void {
    const data = {
      title: this.searchField,
      categories: [],
      authors: []
    };

    data.categories = this.categories.filter((obj) => {
      return obj.checked;
    }).map(obj => {
      return obj._id;
    })

    data.authors = this.authors.filter((obj) => {
      return obj.checked;
    }).map(obj => {
      return obj._id;
    })

    if (data.title.length === 0 && data.categories.length === 0 && data.authors.length === 0) {
      this.getAllBooks();
    } else {
      this.getFilteredBooks(data);
    }
  }
}
