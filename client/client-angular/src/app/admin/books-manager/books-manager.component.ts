import { Component, OnInit, SecurityContext } from '@angular/core';
import { BookService } from 'src/app/service/books.service';
import { Book } from '../../models/book.model';
import { UserInfo } from 'src/app/service/user-info.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.scss']
})
export class BooksManagerComponent implements OnInit {
  public editeMode = false;
  public image: string | ArrayBuffer;
  public books: Book;
  public categories: object[] = [];
  public authors: object[] = [];
  public editeBookData: Book = {
    title: '',
    authors: [],
    categories: [],
    description: '',
    image: '',
    pageCount: null,
    printType: 'Book'
  };

  public filterData = {
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

  public editeModeToggle() {
    this.editeMode = !this.editeMode;
  }
  public init(): void {
    this.getBooks();
    this.getAuthors();
    this.getCategories();
  }

  public chooseCategory(category): void {
    const status = (document.getElementById(category._id) as HTMLInputElement).checked;
    if (status) {
      this.filterData.categories.add(category);
    }
    if (!status) {
      this.filterData.categories.delete(category);
    }
  }

  public chooseAuthor(author): void {
    const status: boolean = (document.getElementById(author._id) as HTMLInputElement).checked;
    if (status) {
      this.filterData.authors.add(author);
    }
    if (!status) {
      this.filterData.authors.delete(author);
    }
  }

  public filtering(): void {
    const data = {
      categories: [],
      authors: []
    };
    this.filterData.categories.forEach((category: {name: string, _id: string}) => {
      data.categories.push(category._id);
    });
    this.filterData.authors.forEach((author: {name: string, _id: string}) => {
      data.authors.push(author._id);
    });

    if (!(data.categories.length && data.authors.length)) {
      this.bookService.getAllBooks()
      .then((el: any) => {
        this.books = el.slice();
      });
    }

    this.bookService.getSomeBooks(data)
    .then(list => {
      this.books = list.slice();
    });
  }

  public getBooks(): void {
    this.bookService.getAllBooks()
    .then((el: any) => {
      this.books = el.slice();
    });
  }

  public getAuthors(): void {
    this.bookService.getAllAuthors()
    .then(el => {
      this.authors = el.slice();
    });
  }

  public getCategories(): void {
    this.bookService.getAllCategories()
    .then(el => {
      this.categories = el.slice();
    });
  }

  public uploadFile(e, id: string): void {
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      this.editeBookData.image = reader.result;
      (document.getElementById('blah') as HTMLImageElement).src = (this.editeBookData.image as  string);
    };
    reader.readAsDataURL(input.files[0]);
  }

  public chooseEditeBook(book): void {
    this.editeModeToggle();
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

  public addBookToFavorite(book, user) {
    this.bookService.addBookToDB(book, user);
  }

  public editeBook(): void {
    this.bookService.updateBook(this.editeBookData);
    this.init();
  }

  public deleteBook(book: Book): void {
    this.bookService.deleteBook(book);
    this.init();
  }
}
