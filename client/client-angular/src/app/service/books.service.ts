import { OnInit } from '@angular/core';
import { Axios } from '../interceptor/token.interseptor';
import { SortType } from '../models/sort-type.model';
import { Book } from '../models/book.model';
import { User } from '../models/user.model';

export class BookService implements OnInit {
  constructor() {}

  getAllBooks() { // Sort Type model
    return Axios.get('/books')
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
  }

  getSomeBooks(data) {
    return Axios.get('/somebooks', {params: data})
    .then(res => {
      return res.data;
    });
  }

  addBookToDB(book: Book, user: User) {
    return Axios.post('/books', {book, user})
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  changeImageInBook(data: {id: string, image: string | ArrayBuffer}) {
    return Axios.post('/book', data)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  getAllAuthors() {
    return Axios.get('/author')
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err)
    );
  }

  getAllCategories() {
    return Axios.get('/category')
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
  }

  filtering(data) {
    return Axios.get('/books', {params: data});
  }

  ngOnInit() {}
}
