import { Book } from '../models/book.model';
import { BookFilter } from '../models/book-filter.model';
import { PaginationEvent } from '../models/pagination-event.model';
import { ServerResponce } from './../models/server-response.model';
import { CategoryAuthor } from '../models/category-author.model';
import { Axios } from '../interceptor/token.interceptor';
import { AxiosResponse } from 'axios';

export class BookServiceClass {
  public getAllBooks(pagination?: PaginationEvent): Promise<ServerResponce> {
    return Axios.get('/books', {params: pagination})
    .then(res => res.data)
  }

  public getSomeBooks(data: BookFilter): Promise<ServerResponce[]> {
    return Axios.get('/somebooks', {params: data})
    .then(res => res.data)
  }

  public getBookByIndustryIdentifiers(industryIdentifiers: string[]): Promise<Book[]>  {
    return Axios.get('/getbookbyindustryIdentifiers', {params: {industryIdentifiers}})
    .then(res => res.data)
  }

  public addBookToDB(book: Book): Promise<AxiosResponse> {
    return Axios.post('/books', {book})
    .then(res => {
      return res;
    })
  }

  public updateBook(data: Book): Promise<AxiosResponse> {
    return Axios.put('/books', data)
    .then(res => {
      return res;
    })
  }

  public changeImageInBook(data: {id: string, image: string | ArrayBuffer}): Promise<AxiosResponse> {
    return Axios.post('/book', data)
    .then(res => {
      return res;
    })
  }

  public deleteBook(data: Book): Promise<AxiosResponse> {
    return Axios.delete('/books', {data})
    .then(res => {
      return res;
    })
  }

  public getAllAuthors(): Promise<CategoryAuthor[]> {
    return Axios.get('/author')
    .then(res => {
      return res.data;
    })
  }

  public getAllCategories(): Promise<CategoryAuthor[]> {
    return Axios.get('/category')
    .then(res => {
      return res.data;
    })
  }
}
const BookService = new BookServiceClass();
export default BookService;