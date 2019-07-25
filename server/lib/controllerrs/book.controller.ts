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
    Books.findOne({title: req.body.title, industryIdentifiers: req.body.industryIdentifiers}, (err, book) => {
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

      let listCategories = [];
      let listCategoriesId = [];
      let listAuthors = [];
      let listAuthorsId =[];

      Category.find({ name: {$in: req.body.categories}}, (err, category) => {
        console.log('request', req.body.categories);
        console.log('find', category, 'length', category.length);

        if (category.length > 0) {
          category.forEach(el => {
            listCategoriesId.push(el._id)
          })
        }
        if (category.length === 0) {
          req.body.categories.forEach(el => {
            const id = mongoose.Types.ObjectId()
            listCategories.push({
              _id: id,
              name: el,
              _v: 0
            });
            listCategoriesId.push(id)
          })
        }
        Category.insertMany(listCategories)
      })

      Authors.find({ name: {$in: req.body.authors}}, (err, author) => {
        if (author.length > 0) {
          author.forEach(el => {
            listAuthorsId.push(el._id)
          })
        }
        if (author.length === 0) {
          req.body.authors.forEach(el => {
            const id = mongoose.Types.ObjectId()
            listAuthors.push({
              _id: id,
              name: el,
              _v: 0
            });
            listAuthorsId.push(id)
          })
        }
        Authors.insertMany(listAuthors)
      })
      
      Books.findOne({title: req.body.title, authors: req.body.authors}, (err, book) => {
        if (err) {
          res.status(500).send({
            message: 'error on the server'
          })
        }
        if (book) {
          res.status(400).send({
            message: 'book already exist'
          })
        }

        Books.create({
          title: req.body.title,
          authors: listAuthorsId,
          categories: listCategoriesId,
          description: req.body.description,
          image: req.body.image,
          pageCount: req.body.pageCount,
          printType: req.body.printType,
          industryIdentifiers: req.body.industryIdentifiers
        }, (err, book) => {
          res.status(200).send({
            message: 'successfull'
          })
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
