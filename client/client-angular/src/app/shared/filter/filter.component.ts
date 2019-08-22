import { Component, OnInit, Input } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { CategoryAuthor } from 'src/app/models/category-author.model';
import { Book } from 'src/app/models/book.model';

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

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getAuthors();
    this.getCategories();
  }

  public getAuthors(): void {
    this.bookService.getAllAuthors()
      .then((author: CategoryAuthor[]) => {
        this.authors = author;
      });
  }

  public getCategories(): void {
    this.bookService.getAllCategories()
      .then((categories: CategoryAuthor[]) => {
        this.categories = categories;
      });
  }

  public chooseAuthor(author: CategoryAuthor): void {
    const status: boolean = (document.getElementById(author._id) as HTMLInputElement).checked;
    if (status) {
      this.filterData.authors.add(author);
    }
    if (!status) {
      this.filterData.authors.delete(author);
    }
  }

  public chooseCategory(category: CategoryAuthor): void {
    const status = (document.getElementById(category._id) as HTMLInputElement).checked;
    if (status) {
      this.filterData.categories.add(category);
    }
    if (!status) {
      this.filterData.categories.delete(category);
    }
  }

  public filtering(): void {
    const data = {
      title: this.searchField,
      categories: [],
      authors: []
    };

    this.filterData.categories.forEach((category: CategoryAuthor) => {
      data.categories.push(category._id);
    });
    this.filterData.authors.forEach((author: CategoryAuthor) => {
      data.authors.push(author._id);
    });

    if (data.title.length === 0 && data.categories.length === 0 && data.authors.length === 0) {
      this.getAllBooks();
    } else {
      this.getFilteredBooks(data);
    }
  }
}
