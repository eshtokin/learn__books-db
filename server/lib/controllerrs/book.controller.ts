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
    const skip = {
      $skip: (+req.query.pageIndex) * (+req.query.pageSize)
    };
    const limit = {
        $limit: (+req.query.pageSize)
    }
    let query = {
      $facet: {
        books: [
          skip, 
          limit
        ],
        totalCount: [
          {
            $count: 'count'
          }
        ]
      }
    };

    const agreagationQuery: object[] = [{
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
    
    agreagationQuery.push(query);
    
    mongoDbService.Aggreagate(Books, agreagationQuery)
    .then(list => {
      return res.json(list[0])
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
    const pagination = JSON.parse(req.query.pagination);

    const regExp = new RegExp(`.*${req.query.title? req.query.title: ' '}*`);

    const queryTitle =  req.query.title.length
    ? {
      $or: [
        {title: {$regex: regExp, $options: 'i'}}, 
        {'authors_list.name': {$regex: regExp, $options: 'i'}},
        {'categories_list.name': {$regex: regExp, $options: 'i'}}
      ]
    } 
    : {};
    const queryCategories =  categoriesFilter.length > 0 ? {categories: {$in: categoriesFilter}} : {};
    const queryAuthors =  authorsFilter.length > 0 ?  {authors: {$in: authorsFilter}} : {};
    const skip = {
      $skip: pagination.pageIndex * pagination.pageSize
    };
    const limit = {
        $limit: pagination.pageSize
    };
    
    const query = {
      $and: [
        {...queryTitle},
        {...queryCategories},
        {...queryAuthors}
      ]
    };

    const agreagateQuery = [
      { 
        $lookup: {
        from: "categories",
        localField: "categories",
        foreignField: "_id",
        as: "categories_list"
        }
      }, 
      {
        $lookup: {
        from: "authors",
        localField: "authors",
        foreignField: "_id",
        as: "authors_list"
        }
      },
      {
        $match: query
      },
      { 
        $facet: {
          books: [
            skip, 
            limit
          ],
          totalCount: [
            {
              $count: 'count'
            }
          ]
        }
      }
    ];

    mongoDbService.Aggreagate(Books, agreagateQuery)
    .then(list => res.json(list))
    .catch(err => res.send(err))
  }

  public getUserBooks(req: Request, res: Response) {
    let objIdBooks = req.query.books.map(el => mongoose.Types.ObjectId(el));
    const pagination = JSON.parse(req.query.pagination);
        
    const skip = {
        $skip: (+pagination.pageIndex) * (+pagination.pageSize)
    };
    const limit = {
        $limit: (+pagination.pageSize)
    }
    let query = {
        $facet: {
          books: [
            skip, 
            limit
          ],
          totalCount: [
            {
              $count: 'count'
            }]
        }
    };
    
    const agreagateQuery = [{
      $match: {
          _id: {$in: objIdBooks}
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
    }, {
      $match: {
        title: {
          $regex: `.*${req.query.title? req.query.title: ' '}*`,
          $options: 'i'
        }, 
      }
    }, {
      ...query
    }];

    mongoDbService.Aggreagate(Books, agreagateQuery)
    .then(list => res.json(list))
    .catch(err => res.send(err))
  }

  public addBook(req: Request, res: Response) {
    let listCategories = [];
    let listCategoriesId = [];
    let listAuthors = [];
    let listAuthorsId =[];

    let queryForCategory: object = req.body.book.categories_list ?
    { name: {
      $in: req.body.book.categories_list.map(el => {
        return el.name;
      })
    }}
    : { name: {
      $in: req.body.book.categories
    }};

    mongoDbService.find(Category, queryForCategory)
    .then(category => {
      if (category.length > 0) {
        category.forEach(el => {
          listCategoriesId.push(mongoose.Types.ObjectId(el._id))
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
        });
        mongoDbService.insertMany(Category, listCategories);
      }
      
    })
    .catch(err => res.send(err))

    let queryForAuthor: object = req.body.book.authors_list ?
    { name: {
      $in: req.body.book.authors_list.map(el => {
        return el.name;
      })
    }}
    : { name: {
      $in: req.body.book.authors
    }};
  
    mongoDbService.find(Authors, queryForAuthor)
    .then(authors => {
      if (authors.length > 0) {
        authors.forEach(author => {
          listAuthorsId.push(mongoose.Types.ObjectId(author._id))
        })
        if (authors.length !== req.body.book.authors.length) {
          req.body.book.authors.forEach(author => {
            authors.forEach(auth => {
              if (auth.name !== author) {
                const id = mongoose.Types.ObjectId()
                listAuthors.push({
                  _id: id,
                  name: author,
                  _v: 0
                });
                listAuthorsId.push(id)
              }
            })
          })
          mongoDbService.insertMany(Authors, listAuthors);
        }
      }
      if (authors.length === 0) {
        req.body.book.authors.forEach(el => {
          const id = mongoose.Types.ObjectId()
          listAuthors.push({
            _id: id,
            name: el,
            _v: 0
          });
          listAuthorsId.push(id)
        });
        mongoDbService.insertMany(Authors, listAuthors);
      }
    })
    .catch(err => res.send(err))

    let industryIdentifiers = '';
    req.body.book.industryIdentifiers.forEach((obj: {type: string, identifier: string}) => {
      industryIdentifiers += obj.type + obj.identifier;
    });
  
    let queryForBook= {
      title: req.body.book.title,
      industryIdentifiers //: req.body.book.industryIdentifiers
    };
    mongoDbService.findOne(Books, queryForBook)
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

      let query = {
        _id: bookId,
        title: req.body.book.title,
        authors: listAuthorsId,
        categories: listCategoriesId,
        description: req.body.book.description,
        image: req.body.book.image,
        pageCount: req.body.book.pageCount,
        printType: req.body.book.printType,
        industryIdentifiers
      };
  
      mongoDbService.create(Books, query)
      .then(book => {
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
    
    Authors.find({name: {$in: req.body.authors}}, (err, authorList) => {
      authorList.forEach(author => {
        authors.push(mongoose.Types.ObjectId(author._id))
      });

      Category.find({name: {$in: req.body.categories}}, (err, categoryList) => {
        categoryList.forEach(category => {
          categories.push(mongoose.Types.ObjectId(category._id))
        });

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
      });
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

  public getBookByIndustryIdentifiers(req: Request, res: Response) {
    const query = {
      industryIdentifiers: {
        $in: req.query.industryIdentifiers
      }
    };
    mongoDbService.find(Books, query)
    .then(book => res.json(book))
    .catch(err => res.send(err))
  }
}
