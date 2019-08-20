import * as mongoose from 'mongoose'
import { BookSchema } from "../models/book.model"
import {Response, Request} from 'express'
import { Category } from './category.controller';
import { Authors } from './author.controller';
import { User } from './user.controller';
import { MongoDbService } from '../service/mongodb.service';

export const Books = mongoose.model('Books', BookSchema);
const mongoDbService = new MongoDbService();

export class BookController {
  public getAllBook(req: Request, res: Response) {
    const geralt = mongoose.Types.ObjectId('5d52c65532a6e40e30459aa6');
    const query = [{
      $lookup: {
        from: "categories",
        localField: "categories",
        foreignField: "_id",
        as: "categories_list"
      }
    }, {
      $lookup: {
        from: "authors",
        localField: "authors",
        foreignField: "_id",
        as: "authors_list"
      }
    }];

    mongoDbService.Aggreagate(Books, query)
    .then(list => {
      return res.json(list)
    })
    .catch(err => res.send(err))
  }

  public getSomeBooks(req: Request, res: Response) {
    const authorsFilter = [];
    const categoriesFilter = [];
    if (req.query.authors) {
      req.query.authors.forEach(author => {
        authorsFilter.push(mongoose.Types.ObjectId(author))
      })
    }
    if (req.query.categories) {
      req.query.categories.forEach(category => {
        categoriesFilter.push(mongoose.Types.ObjectId(category))
      })
    }
    if (req.query.authors && req.query.categories) {
      const query = {
        $and: [
          {categories: {$in: categoriesFilter}},
          {authors: {$in: authorsFilter}}
        ]
      };
      mongoDbService.find(Books, query)
      .then(list => {
        return res.json(list)
      })
      .catch(err => res.send(err))

      return
    }
    if (req.query.authors || req.query.categories) {
      const query = {
        $or: [
          {categories: {$in: categoriesFilter}},
          {authors: {$in: authorsFilter}}
        ]
      };

      mongoDbService.find(Books, query)
      .then(list => res.json(list))
      .catch(err => res.send(err))

      return
    }
  }

  public getUserBooks(req: Request, res: Response) {
    let objIdBooks = req.query.books.map(el => mongoose.Types.ObjectId(el));

    const query = [{
      $match: {
        _id: {
          $in: objIdBooks
        }
      } 
    }, {
      $lookup: {
        from: "categories",
        localField: "categories",
        foreignField: "_id",
        as: "categories_list"
      }
    }, {
      $lookup: {
        from: "authors",
        localField: "authors",
        foreignField: "_id",
        as: "authors_list"
      }
    }];

    mongoDbService.Aggreagate(Books, query)
    .then(list => res.json(list))
    .catch(err => res.send(err))
  }

  public addBook(req: Request, res: Response) {
    let listCategories = [];
    let listCategoriesId = [];
    let listAuthors = [];
    let listAuthorsId =[];
    
    let query: object = {
      name: {
        $in: req.body.book.categories
      }
    };

    mongoDbService.find(Category, query)
    .then(category => {
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
    .catch(err => res.send(err))

    query = {
      name: {
        $in: req.body.book.authors
      }
    };
    mongoDbService.find(Authors, query)
    .then(author => {
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
    .catch(err => res.send(err))
 
    query = {
      title: req.body.book.title,
      industryIdentifiers: req.body.book.industryIdentifiers
    };
    mongoDbService.findOne(Books, query)
    .then(book => {
      if (book && req.body.user) {
        const query = {
          _id: mongoose.Types.ObjectId(req.body.user.id)
        };
        const data = {
          $addToSet: { books: book._id}
        };

        mongoDbService.findOneAndUpdate(User, query, data)
        .then(() => {
          return res.status(200).send({
            message: `added in bd and profile`
          })
        })
        .catch(err => res.send(err))
        return;
      }

      if (book) {
        return res.status(400).send({
          message: `book already exist`
        })
      }

      const bookId = mongoose.Types.ObjectId();
      query = {
        _id: bookId,
        title: req.body.book.title,
        authors: listAuthorsId,
        categories: listCategoriesId,
        description: req.body.book.description,
        image: req.body.book.image,
        pageCount: req.body.book.pageCount,
        printType: req.body.book.printType,
        industryIdentifiers: req.body.book.industryIdentifiers
      };

      mongoDbService.create(Books, query)
      .then(book => {
        // if (book && req.body.user) {
        //   query = {
        //     _id: mongoose.Types.ObjectId(req.body.user.id)
        //   };
        //   const data = {
        //     $addToSet: { books: book._id} 
        //   }

        //   mongoDbService.findOneAndUpdate(User, query, data)
        //   .then(() => {
        //     return res.status(200).send({
        //       message: `added in bd and profile`
        //     })
        //   })
        //   .catch(err => res.send(err))
        // }
          return res.status(200).send({
          message: 'added in bd'
        })
      })
      .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
  }

  public updateBook(req: Request, res: Response) {
    let authors = [];
    let categories = [];
    let newCategories = [];
    let newAuthors = [];

    Authors.find({name: {$in: req.body.authors}}, (err, authorList) => {
      req.body.authors.forEach((authorReq) => {
        authorList.forEach((authorDb) => {
          if (authorReq !== authorDb.name) {
            const id = mongoose.Types.ObjectId();
            newCategories.push({
              _id: id,
              name: authorReq,
              __v: 0
            })
          }
          if (authorReq === authorDb.name) {
            authors.push(authorDb._id)
          }
        })
      })

      Authors.insertMany(newAuthors);
      newAuthors.forEach(author => {
        authors.push(author._id)
      });
    })

    Books.findOneAndUpdate({industryIdentifiers: req.body.industryIdentifiers},
      {
        title: req.body.title,
        authors,
        categories,
        description: req.body.description,
        pageCount: req.body.pageCount,
        image: req.body.image
      }, (err, book) => {
        if (err) {
          return res.send(err)
        }
        return res.status(200).send({
          message: 'Successfuy updated'
      })
    })
  }

  public deleteBook(req: Request, res: Response) {
    const query = {
      industryIdentifiers: req.body.industryIdentifiers
    };

    mongoDbService.findOneAndDelete(Books, query)
    .then(() => {
      return res.status(200).send({
        message: 'successfuly deleted'
      })
    })
    .catch(err => res.send(err))
  }

  public getBook(req: Request, res: Response) {
    const query = {
      _id: req.params.bookId
    };
    mongoDbService.findById(Books, query)
    .then(book => {
      return res.json(book)
    })
    .catch(err => res.send(err))
  }
}
