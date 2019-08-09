import { Axios } from '../interceptor/token.interceptor';
// import Axios from 'axios';

import { Book } from '../models/book.model';
import { User } from '../models/user.model';

export const BookService = {
  getAllBooks() { // Sort Type model
    return Axios.get('/books')
    .then( res => {
      return res.data;
    })
    .catch((err: Error) => console.log(err));
  },

  getSomeBooks(data: {categories?: string[], authors?: string[]}) {
    return Axios.get('/somebooks', {params: data})
    .then(res => {
      return res.data;
    })
    .catch((err: Error) => {console.log(err)});
  },

  addBookToDB(book: Book, user: User) {
    return Axios.post('/books', {book, user})
    .then(res => {
      return res;
    })
    .catch((err: Error) => console.log(err));
  },

  updateBook(data: Book) {
    return Axios.put('/books', data)
    .then(res => {
      return res;
    })
    .catch((err: Error) => console.log(err));
  },

  changeImageInBook(data: {id: string, image: string | ArrayBuffer}) {
    return Axios.post('/book', data)
    .then(res => {
      return res;
    })
    .catch((err: Error) => console.log(err));
  },

  deleteBook(data: Book) {
    return Axios.delete('/books', {data})
    .then(res => {
      return res;
    })
    .catch((err: Error)=> console.log(err));
  },

  getAllAuthors() {
    return Axios.get('/author')
    .then(res => {
      return res.data;
    })
    .catch((err: Error) => console.log(err)
    );
  },

  getAllCategories() {
    return Axios.get('/category')
    .then(res => {
      return res.data;
    })
    .catch((err: Error) => console.log(err));
  },

  filtering(data: {categories?: string[], authors?: string[]}) {
    return Axios.get('/books', {params: data});
  }
}
