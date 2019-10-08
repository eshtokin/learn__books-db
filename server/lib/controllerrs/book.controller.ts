import {Response, Request} from 'express'
import BookService from './../services/book.service';

const bookService = new BookService();

export class BookController {

  public getAllBook(req: Request, res: Response) {
    bookService.getAllBook(req)
    .then(list => res.json(list[0]))
    .catch(err => res.send(err))
  }

  public getSomeBooks(req: Request, res: Response) {
    bookService.getSomeBooks(req)
    .then(list => res.json(list))
    .catch(err => res.send(err))
  }

  public getUserBooks(req: Request, res: Response) {
    bookService.getUserBooks(req)
    .then(list => res.json(list))
    .catch(err => res.send(err))
  }

  public addBook(req: Request, res: Response) {
    bookService.addBook(req)
    .then(() => res.status(200).send({
      message: 'added in bd'
    }))
    .catch(err => res.send(err))
  }

  public updateBook(req: Request, res: Response) {
    bookService.updateBook(req)
    .then(() => res.status(200).send({
      massage: 'Successfuly updated'
    }))
    .catch(err => res.send(err))
  }

  public deleteBook(req: Request, res: Response) {
    bookService.deleteBook(req)
    .then(() => res.status(200).send({
      message: 'successfuly deleted'
    }))
    .catch(err => res.send(err))
  }

  public getBook(req: Request, res: Response) {
    bookService.getBook(req)
    .then(book => {
      return res.json(book)
    })
    .catch(err => res.send(err))
  }

  public getBookByIndustryIdentifiers(req: Request, res: Response) {
    bookService.getBookByIndustryIdentifiers(req)
    .then(book => res.json(book))
    .catch(err => res.send(err))
  }
}
