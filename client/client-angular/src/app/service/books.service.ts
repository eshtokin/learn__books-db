import { OnInit } from '@angular/core';
import Axios from 'axios';

export class BookService implements OnInit {
  constructor() {}

  async getAllBooks() {
    return await Axios.get('http://localhost:3000/books')
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
  }

  addBookToDB(book) {
    return Axios.post('http://localhost:3000/books', book)
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

  ngOnInit() {}
}
