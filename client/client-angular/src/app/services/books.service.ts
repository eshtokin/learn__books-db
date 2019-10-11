import { Axios } from '../core.module/interceptor/token.interseptor';
import { Book } from '../models/book.model';
import { BookFilter } from '../models/book-filter.model';
import { PaginationEvent } from '../models/pagination-event.model';
import { ServerResponceWithBook } from '../models/server-response.model';
import { CategoryAuthor } from '../models/category-author.model';

export class BookService {
  constructor() {}

  public async getAllBooks(pagination?: PaginationEvent): Promise<ServerResponceWithBook> {
    const response = await Axios.get('/books', {params: {pagination}});
    return response.data;
  }

  public async getSomeBooks(data: BookFilter): Promise<ServerResponceWithBook> {
    const response = await Axios.get('/somebooks', {params: data});
    return response.data;
  }

  public async getBookByIndustryIdentifiers(industryIdentifiers: string[]): Promise<Book[]>  {
    const response = await Axios.get('/getbookbyindustryIdentifiers', {params: {industryIdentifiers}});
    return response.data;
  }

  public async addBookToDB(book: Book): Promise<any> {
    const response = await Axios.post('/books', {book});
    return response.data;
  }

  public async updateBook(book: Book): Promise<any> {
    const response = await Axios.put('/books', {book});
    return response.data;
  }

  public async changeImageInBook(data: {id: string, image: string | ArrayBuffer}): Promise<any> {
    return await Axios.post('/book', data);
  }

  public async deleteBook(book: Book): Promise<any> {
    return await Axios.delete('/books', {params: {book}});
  }

  public async getAllAuthors(): Promise<CategoryAuthor[]> {
    const response = await Axios.get('/author');
    return response.data;
  }

  public async getAllCategories(): Promise<CategoryAuthor[]> {
    const response =  await Axios.get('/category');
    return response.data;
  }
}
