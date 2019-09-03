import { Axios } from '../interceptor/token.interseptor';
import { Book } from '../models/book.model';
import { User } from '../models/user.model';
import { BookFilter } from '../models/book-filter.model';
import { Pagination } from '../models/pagination.model';

export class BookService {
  constructor() {}

  public getAllBooks(pagination?: Pagination): Promise<Book[]> {
    return Axios.get('/books', {params: pagination})
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
  }

  public getSomeBooks(data: BookFilter) {
    return Axios.get('/somebooks', {params: data})
    .then(res => {
      return res.data;
    });
  }

  public addBookToDB(book: Book, user: User) {
    return Axios.post('/books', {book, user})
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  public updateBook(data: Book) {
    return Axios.put('/books', data)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  public changeImageInBook(data: {id: string, image: string | ArrayBuffer}) {
    return Axios.post('/book', data)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  public deleteBook(data: Book) {
    return Axios.delete('/books', {data})
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  public getAllAuthors() {
    return Axios.get('/author')
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err)
    );
  }

  public getAllCategories() {
    return Axios.get('/category')
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
  }
}
