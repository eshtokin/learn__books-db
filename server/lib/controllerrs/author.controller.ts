import * as mongoose from 'mongoose'
import { AuthorSchema } from '../models/author.model'
import { Request, Response } from 'express'

export const Authors = mongoose.model('Author', AuthorSchema);

export class AuthorController {
  public getAllAuthor(req: Request, res: Response) {
    Authors.find({}, (err, authors) => {
      if (err) {
        res.send(err)
      }
      res.send(authors)
    })
  }

  public addAuthor(req: Request, res: Response) {
    Authors.findOne({name: req.body.name}, (err, author) => {
      if (err) {
        return res.status(500).send({
          message: 'error on the server'
        })
      }
      if (author) {
        return res.status(400).send({
          meessage: 'author already exist'
        })
      }

      Authors.create({
        name: req.body.name
      }, (err, author) => {
        res.status(200).send({
          message: 'successful'
        })
      })
    })
  }

  public deleteAuthor(req: Request, res: Response) {
    Authors.findOneAndDelete({name: req.body.name}, (err) => {
      if (err) {
        return res.send(err)
      }
      return res.send({
        meessage: 'successfuly deleted'
      })
    })
  }
}