import { Book } from '../models/book.model';
import { BookFilter } from '../models/book-filter.model';
import { PaginationEvent } from '../models/pagination-event.model';
import { CategoryAuthor } from '../models/category-author.model';
import { Axios } from '../interceptor/token.interceptor';
import { AxiosResponse } from 'axios';
import { ServerResponce } from '../models/server-response.model';

export class BookServiceClass {

  public async getAllBooks(pagination: PaginationEvent): Promise<AxiosResponse<ServerResponce>> {
    const response = await Axios.get('/books', {params: {pagination}});
    return response;
  }

  public async getSomeBooks(data: BookFilter): Promise<AxiosResponse<ServerResponce[]>> {
    const response = await Axios.get('/somebooks', {params: data});
    return response;
  }

  public async getBookByIndustryIdentifiers(industryIdentifiers: string[]): Promise<AxiosResponse>  {
    const response = await Axios.get('/getbookbyindustryIdentifiers', {params: {industryIdentifiers}});
    return response;
  }

  public async addBookToDB(book: Book): Promise<AxiosResponse> {
    const response = await  Axios.post('/books', {book});
    return response;
  }

  public async updateBook(data: Book): Promise<AxiosResponse> {
    const response = await Axios.put('/books', data);
    return response;
  }

  public async changeImageInBook(data: {id: string, image: string | ArrayBuffer}): Promise<AxiosResponse> {
    const response = await  Axios.post('/book', data);
    return response;
  }

  public async deleteBook(data: Book): Promise<AxiosResponse> {
    const response = await Axios.delete('/books', {data});
    return response;
  }

  public async getAllAuthors(): Promise<AxiosResponse<CategoryAuthor[]>>  {
    const response = await Axios.get('/author');
    return response;
  }
 
  public async getAllCategories(): Promise<AxiosResponse<CategoryAuthor[]>> {
    const response = await Axios.get('/category');
    return response;
  }
}
const BookService = new BookServiceClass();
export default BookService;