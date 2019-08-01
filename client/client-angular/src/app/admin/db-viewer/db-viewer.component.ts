import { Component, OnInit, SecurityContext } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import {Router} from '@angular/router';

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
  editeBookData: Book = {
    title: '',
    authors: [],
    categories: [],
    description: '',
    image: '',
    pageCount: 0,
    printType: 'Book'
  };

  filterData = {
    title: '',
    categories: new Set(),
    authors: new Set()
  };

  constructor(
    private bookService: BookService,
    private router: Router
    ) {}

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
      categories: [],
      authors: []
    };
    this.filterData.categories.forEach(category => {
      data.categories.push(category._id);
    });
    this.filterData.authors.forEach(author => {
      data.authors.push(author._id);
    });

    if (!(data.categories.length && data.authors.length)) {
      this.bookService.getAllBooks()
      .then(el => {
        this.books = el.slice();
      });
    }

    this.bookService.getSomeBooks(data)
    .then(list => {
      this.books = list.slice();
    });
  }

  getBooksWithSort() {
    this.bookService.getAllBooks()
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

  editeBook(book) {
    console.log(this.books);
    console.log(book);

    this.editeBookData  = {
      title: book.title,
      authors: [],
      categories: [],
      pageCount: book.pageCount,
      description: book.description,
      industryIdentifiers: book.industryIdentifiers,
      image: book.image,
      printType: book.printType
    };

    book.authors_list.forEach(a => {
      this.editeBookData.authors.push(a.name);
    });

    book.categories_list.forEach(c => {
      this.editeBookData.categories.push(c.name);
    });
  }
}
