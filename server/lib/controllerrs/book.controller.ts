import * as mongoose from 'mongoose'
import { BookSchema } from "../models/book.model"
import {Response, Request} from 'express'
import { Category } from './category.controller'
import { Authors } from './author.controller'

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
    Books.findOne({title: req.body.title, authors: req.body.authors}, (err, book) => {
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

      req.body.categories.forEach( name => {
        Category.findOne({name}, (err, result) => {
          let timeId = mongoose.Types.ObjectId();
  
          if (!result) {
            Category.create({_id: timeId, name})
          }
  
          setTimeout(() => {
            Books.findOneAndUpdate(
              {title: req.body.title}, 
              { $set: {categories: result? mongoose.Types.ObjectId(result._id) : timeId}}, 
              (err, book) => {}
            )
          }, 1000)
        })
      });


      req.body.authors.forEach( name => {
        Authors.findOne({name}, (err, result) => {
          let timeId = mongoose.Types.ObjectId();
   
          if (!result) {
            Authors.create({_id: timeId, name})
          }
  
          setTimeout(() => {
            Books.findOneAndUpdate(
              {title: req.body.title}, 
              { $set: {authors: result? mongoose.Types.ObjectId(result._id) : timeId}}, 
              (err, book) => {}
            )
          }, 1000)
        })
      });

      Books.create({
        title: req.body.title,
        authors: req.body.authors,
        categories: req.body.categories,
        description: req.body.description,
        image: req.body.image,
        pageCount: req.body.pageCount,
        printType: req.body.printType
      }, (err, book) => {
        res.status(200).send({
          message: `successful`
        })
      })
     
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
