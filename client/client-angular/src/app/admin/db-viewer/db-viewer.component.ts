import { Component, OnInit, SecurityContext } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import { SortType } from '../../models/sort-type.model';

@Component({
  selector: 'app-db-viewer',
  templateUrl: './db-viewer.component.html',
  styleUrls: ['./db-viewer.component.scss']
})
export class DbViewerComponent implements OnInit {
  image: string | ArrayBuffer;
  books: Book;
  categories: object[] = [];
  authors: object[] = [];

  filterData = {
    title: '',
    categories: new Set(),
    authors: new Set()
  };

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getBooksWithSort();
    this.getAuthors();
    this.getCategories();
  }

  chooseCategory(category) {
    const status = document.getElementById(category._id).checked; // error
    if (status) {
      this.filterData.categories.add(category);
    }
    if (!status) {
      this.filterData.categories.delete(category);
    }
  }

  chooseAuthor(author) {
    const status = document.getElementById(author._id).checked;
    if (status) {
      this.filterData.authors.add(author);
    }
    if (!status) {
      this.filterData.authors.delete(author);
    }
  }

  filtering() {
    const data = {
      title: this.filterData.title,
      categories: [],
      authors: []
    };
    this.filterData.categories.forEach(category => {
      data.categories.push(category._id);
    });
    this.filterData.authors.forEach(author => {
      data.authors.push(author._id);
    });
    this.bookService.getSomeBooks(data)
    .then(list => {
      this.books = list.slice();
    });
  }

  getBooksWithSort(sortType: SortType = {title: -1}) { // SortType
    this.bookService.getAllBooks(sortType)
    .then(el => {
      this.books = el.slice();
    });
  }

  getAuthors() {
    this.bookService.getAllAuthors()
    .then(el => {
      this.authors = el.slice();
    });
  }

  getCategories() {
    this.bookService.getAllCategories()
    .then(el => {
      this.categories = el.slice();
    });
  }

  uploadFile(e, id: string) {
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result;
      this.changeBookImg(id, this.image);
    };
    reader.readAsDataURL(input.files[0]);
  }

  changeBookImg(id: string, image: string | ArrayBuffer) {
    this.bookService.changeImageInBook({id, image});
  }
}
