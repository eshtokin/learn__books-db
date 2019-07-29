import { OnInit } from '@angular/core';
import Axios from 'axios';

export class BookService implements OnInit {
  constructor() {}

  getAllBooks() {
    return Axios.get('http://localhost:3000/books')
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => console.log(err));
  }

  addBookToDB(book, user) {
    return Axios.post('http://localhost:3000/books', {book, user})
    .then(res => {
      console.log(book);
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
  }

  addBookToProfile() {
    console.log('add to profile');
  }

  changeImageInBook(data) {
    return Axios.post('http://localhost:3000/book', data)
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
  }

  ngOnInit() {}
}
