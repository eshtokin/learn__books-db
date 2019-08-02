import { Component, OnInit, SecurityContext } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import { UserInfo } from 'src/app/service/user-info.service';

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
    pageCount: null,
    printType: 'Book'
  };

  filterData = {
    title: '',
    categories: new Set(),
    authors: new Set()
  };

  constructor(
    private userInfo: UserInfo,
    private bookService: BookService,
    ) {}

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.getBooks();
    this.getAuthors();
    this.getCategories();
  }

  chooseCategory(category): void {
    const status: boolean = document.getElementById(category._id).checked;
    if (status) {
      this.filterData.categories.add(category);
    }
    if (!status) {
      this.filterData.categories.delete(category);
    }
  }

  chooseAuthor(author): void {
    const status: boolean = document.getElementById(author._id).checked;
    if (status) {
      this.filterData.authors.add(author);
    }
    if (!status) {
      this.filterData.authors.delete(author);
    }
  }

  filtering(): void {
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

  getBooks(): void {
    this.bookService.getAllBooks()
    .then(el => {
      this.books = el.slice();
    });
  }

  getAuthors(): void {
    this.bookService.getAllAuthors()
    .then(el => {
      this.authors = el.slice();
    });
  }

  getCategories(): void {
    this.bookService.getAllCategories()
    .then(el => {
      this.categories = el.slice();
    });
  }

  uploadFile(e, id: string): void {
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      this.editeBookData.image = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
  }

  chooseEditeBook(book): void {
    this.editeBookData = {
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

  editeBook(): void {
    this.bookService.updateBook(this.editeBookData);
    this.init();
  }

  deleteBook(book: Book): void {
    this.bookService.deleteBook(book);
    this.init();
  }
}
