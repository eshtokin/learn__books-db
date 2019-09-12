import { Component, OnInit, Input } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { CategoryAuthor } from 'src/app/models/category-author.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  public searchField = '';
  public searchStringUpdate = new Subject<string>();
  public linkParams;

  constructor(
    private bookService: BookService,
    private activeRoute: ActivatedRoute,
  ) {
    this.bookService = new BookService();
    this.searchStringUpdate
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.filtering();
      });
  }

  ngOnInit() {
    this.linkParams = this.activeRoute.snapshot.queryParams;
    this.searchField = this.linkParams.title;
    this.getAuthors();
    this.getCategories();
  }

  public getAuthors(): void {
    this.bookService.getAllAuthors()
      .then((authors: CategoryAuthor[]) => {
        this.authors = authors.map(author => {
          return {
            ...author,
            checked: this.linkParams.hasOwnProperty('authors') ?
              this.linkParams.authors.indexOf(author._id) === -1 ? false : true
              : false
          };
        });
      });
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
          };
        });
      });
  }

  public filtering(catauth?: CategoryAuthor): void {
    if (catauth !== undefined) {
      catauth.checked = !catauth.checked;
    }
    const data = {
      title: this.searchField,
      categories: [],
      authors: []
    };

    data.categories = this.categories.filter((obj) => {
      return obj.checked;
    }).map(obj => {
      return obj._id;
    });

    data.authors = this.authors.filter((obj) => {
      return obj.checked;
    }).map(obj => {
      return obj._id;
    });

    this.getFilteredBooks(data);
  }
}
