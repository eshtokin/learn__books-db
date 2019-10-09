import {Response} from 'express'
import BookService from './../services/book.service';
import GetAllBookRequest from './../models/request/book-controller/get-all-book.model';
import GetSomeBooksReq from './../models/request/book-controller/get-some-books.model';
import GetUserBooksReq from './../models/request/book-controller/get-use-books.model';
import AddBookRequest from '../models/request/book-controller/add-book.model';
import UpdateBookReq from './../models/request/book-controller/update-book.model';
import DeleteBookReq from './../models/request/book-controller/delete-book.model';
import IndustryIdentifiersRequest from '../models/request/book-controller/industry-identifiers.model';


const bookService = new BookService();

export class BookController {

  public getAllBook(req: GetAllBookRequest, res: Response): void {
    bookService.getAllBook(req)
    .then(list => res.json(list[0]))
    .catch(err => res.send(err))
  }

  public getSomeBooks(req: GetSomeBooksReq, res: Response): void {
    bookService.getSomeBooks(req)
    .then(list => res.json(list))
    .catch(err => res.send(err))
  }

  public getUserBooks(req: GetUserBooksReq, res: Response): void {
    bookService.getUserBooks(req)
    .then(list => res.json(list))
    .catch(err => res.send(err))
  }

  public addBook(req: AddBookRequest, res: Response): void {
    bookService.addBook(req)
    .then(() => res.status(200).send({
      message: 'added in bd'
    }))
    .catch(err => res.send(err))
  }

  public updateBook(req: UpdateBookReq, res: Response): void {
    bookService.updateBook(req)
    .then(() => res.status(200).send({
      massage: 'Successfuly updated'
    }))
    .catch(err => res.send(err))
  }

  public deleteBook(req: DeleteBookReq, res: Response): void {
    bookService.deleteBook(req)
    .then(() => res.status(200).send({
      message: 'successfuly deleted'
    }))
    .catch(err => res.send(err))
  }

  // public getBook(req: Request, res: Response) {
  //   bookService.getBook(req)
  //   .then(book => {
  //     return res.json(book)
  //   })
  //   .catch(err => res.send(err))
  // }

  public getBookByIndustryIdentifiers(req: IndustryIdentifiersRequest, res: Response): void {
    bookService.getBookByIndustryIdentifiers(req)
    .then(book => res.json(book))
    .catch(err => res.send(err))
  }
}
