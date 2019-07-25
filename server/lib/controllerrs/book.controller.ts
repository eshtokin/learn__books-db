import * as mongoose from 'mongoose'
import { BookSchema } from "../models/book.model"
import {Response, Request} from 'express'
import { Category } from './category.controller'
import { Authors } from './author.controller'
import { User } from './user.controller';

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
    let listCategories = [];
    let listCategoriesId = [];
    let listAuthors = [];
    let listAuthorsId =[];

    Category.find({ name: {$in: req.body.book.categories}}, (err, category) => {

      if (category.length > 0) {
        category.forEach(el => {
          listCategoriesId.push(el._id)
        })
      }

      if (category.length === 0) {
        req.body.book.categories.forEach(el => {
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

    Authors.find({ name: {$in: req.body.book.authors}}, (err, author) => {
      if (author.length > 0) {
        author.forEach(el => {
          listAuthorsId.push(el._id)
        })
      }
      if (author.length === 0) {
        req.body.book.authors.forEach(el => {
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
 
    Books.findOne({title: req.body.book.title, industryIdentifiers: req.body.book.industryIdentifiers}, (err, book) => {

      if (err) {
        return res.status(500).send({
          message: `error on the server`
        })
      }

      console.log(book);
      console.log(req.body.user);

      if (book && req.body.user) {
        User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.user.id)}, { $addToSet: { books: book._id} }, (err, user) => {
          console.log(book._id);
          
        });

        return res.status(200).send({
          message: `OK do next`
        })
      }

      if (book) {
        return res.status(400).send({
          message: `book already exist`
        })
      }

      

      const bookId = mongoose.Types.ObjectId();

      Books.create({
        _id: bookId,
        title: req.body.book.title,
        authors: listAuthorsId,
        categories: listCategoriesId,
        description: req.body.book.description,
        image: req.body.book.image,
        pageCount: req.body.book.pageCount,
        printType: req.body.book.printType,
        industryIdentifiers: req.body.book.industryIdentifiers
      }, (err, book) => {
          return res.status(200).send({
          message: 'added in bd'
        })
      });
    })
      // })
    // })
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
