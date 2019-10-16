import {Response, NextFunction} from 'express'
import BookService from './../services/book.service';
import GetAllBookRequest from './../models/request/book-controller/get-all-book.model';
import GetUserBooksReq from './../models/request/book-controller/get-use-books.model';
import AddBookRequest from '../models/request/book-controller/add-book.model';
import UpdateBookReq from './../models/request/book-controller/update-book.model';
import DeleteBookReq from './../models/request/book-controller/delete-book.model';
import IndustryIdentifiersRequest from '../models/request/book-controller/industry-identifiers.model';
import GetBooksByFitlerRequest from './../models/request/book-controller/get-books-by-filter.model';


const bookService = new BookService();

export class BookController {
  public getAllBook(req: GetAllBookRequest, res: Response, next: NextFunction): void {
    bookService.getAllBook(req.query.pagination)
    .then(list => res.json(list[0]))
    .catch(next)
  }

  public getBooksByFitler(req: GetBooksByFitlerRequest, res: Response, next: NextFunction): void {
    bookService.getBooksByFitler(req.query)
    .then(list => res.json(list))
    .catch(next)
  }

  public getUserBooks(req: GetUserBooksReq, res: Response, next: NextFunction): void {
    const params = req.query;
    bookService.getUserBooks(params.books, params.pagination, params.title)
    .then(list => res.json(list))
    .catch(next)
  }

  public addBook(req: AddBookRequest, res: Response, next: NextFunction): void {
    bookService.addBook(req.body.book)
    .then(() => res.status(200).send({
      message: 'added in bd'
    }))
    .catch(next)
  }

  public updateBook(req: UpdateBookReq, res: Response, next: NextFunction): void {
    bookService.updateBook(req.query.book)
    .then(() => res.status(200).send({
      massage: 'Successfuly updated'
    }))
    .catch(next)
  }

  public deleteBook(req: DeleteBookReq, res: Response, next: NextFunction): void {
    bookService.deleteBook(req.query.book)
    .then(() => res.status(200).send({
      message: 'successfuly deleted'
    }))
    .catch(next)
  }

  // public getBook(req: Request, res: Response, next: NextFunction) {
  //   bookService.getBook(req)
  //   .then(book => {
  //     return res.json(book)
  //   })
  //   .catch(next)
  // }

  public getBookByIndustryIdentifiers(req: IndustryIdentifiersRequest, res: Response, next: NextFunction): void {
    bookService.getBookByIndustryIdentifiers(req.query.industryIdentifiers)
    .then(book => res.json(book))
    .catch(next)
  }
}
