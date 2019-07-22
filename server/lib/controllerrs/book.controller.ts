import * as mongoose from 'mongoose'
import { BookSchema } from "../models/book.model"
import {Response, Request} from 'express'

export const Books = mongoose.model('Books', BookSchema);

export class BookController {
  public getAllBook(req: Request, res: Response) {
    Books.find({}, (err, books) => {
      if (err) {
        res.send(err)
      }
      res.json(books)
    })
  }

  public addBook(req: Request, res: Response) {
    Books.findOne({title: req.body.title}, (err, book) => {
      if (err) {
        return res.status(500).send({
          message: `error on the server`
        })
      }
      if (book) {
        return res.status(400).send({
          message: `book already exist`
        })
      }
      if (req.body.title !== "" && req.body.authors !== "") {
        Books.create({
          title: req.body.title,
          authors: req.body.authors
        }, (err, book) => {
          res.status(200).send({
            message: `successful`
          })
        })  
      }
    })
  }

  public deleteBook(req: Request, res: Response) {
    Books.findOneAndDelete({title: req.body.title}, (err) => {
      if (err) {
        return res.send(err)
      }
      return res.status(200).send({
        message: 'successfuly deleted'
      })
    })
  }
}
