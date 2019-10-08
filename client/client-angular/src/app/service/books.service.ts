import { Axios } from '../interceptor/token.interseptor';
import { Book } from '../models/book.model';
import { BookFilter } from '../models/book-filter.model';
import { PaginationEvent } from '../models/pagination-event.model';
import { ServerResponce } from '../models/server-response.model';
import { CategoryAuthor } from '../models/category-author.model';

export class BookService {
  constructor() {}

  public getAllBooks(pagination?: PaginationEvent): Promise<ServerResponce> {
    return Axios.get('/books', {params: {pagination}})
    .then(res => res.data)
    .catch(err => console.log(err));
  }

  public getSomeBooks(data: BookFilter): Promise<ServerResponce> {
    return Axios.get('/somebooks', {params: data})
    .then(res => res.data)
    .catch(err => console.log(err));
  }

  public getBookByIndustryIdentifiers(industryIdentifiers: string[]): Promise<any>  {
    return Axios.get('/getbookbyindustryIdentifiers', {params: {industryIdentifiers}})
    .then(res => res.data)
    .catch(err => console.log(err));
  }

  public addBookToDB(book: Book): Promise<any> {
    return Axios.post('/books', {book})
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  public updateBook(data: Book): Promise<any> {
    return Axios.put('/books', data)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  public changeImageInBook(data: {id: string, image: string | ArrayBuffer}): Promise<any> {
    return Axios.post('/book', data)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  public deleteBook(data: Book): Promise<any> {
    return Axios.delete('/books', {data})
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  public getAllAuthors(): Promise<CategoryAuthor[]> {
    return Axios.get('/author')
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err)
    );
  }

  public getAllCategories(): Promise<CategoryAuthor[]> {
    return Axios.get('/category')
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
  }
}
