import * as mongoose from 'mongoose'
import BookRepository from './../repositories/book.repository';
import { Books } from './../entities/book.model';
import { authorRepository } from './../services/author.service';
import { categoryRepository } from './../services/category.service';
import AuthorAndCategory from 'models/author-and-category.model';
import { AgreagationBookResponse } from 'models/agreagation-response.model';
import Book from 'models/book.model';

const listOfTable = {
  categories: 'categories',
  books: 'books',
  authors: 'authors',
}

export const bookRepository = new BookRepository(Books);

export default class BookService {
  public makeObjectIdFrom(arr) {
    const resultArrWithObjId = [];
    
    arr.forEach(author => {
      resultArrWithObjId.push(mongoose.Types.ObjectId(author._id))
    });

    return resultArrWithObjId;
  }

  public makeQueryFromLinkForSomeBooks(req) {
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

    const regExp = new RegExp(`.*${req.query.title? req.query.title: ' '}*`);

    const queryTitle =  (req.query.title !== undefined && req.query.title.length > 0)
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

    const query = {
      $and: [
        {...queryTitle},
        {...queryCategories},
        {...queryAuthors}
      ]
    };

    return query;
  }

  public makePaginationQuery(req) {
    const pagination = JSON.parse(req.query.pagination);

    const skip = {
      $skip: (pagination.pageIndex) * (pagination.pageSize)
    };
    const limit = {
      $limit: (pagination.pageSize)
    }
    let query = {
      $facet: {
        listOfItem: [
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

    return query;
  }

  public makeAgreagationQueryFor(query: string) {
    return {
      $lookup: {
        from: query,
        localField: query,
        foreignField: "_id",
        as: `${query}_list`
     }
    }
  }

  public async getAllBook(req): Promise<AgreagationBookResponse> {
    const agreagationQuery: object[] = [
      this.makeAgreagationQueryFor(listOfTable.categories),
      this.makeAgreagationQueryFor(listOfTable.authors),
      this.makePaginationQuery(req)
    ];
    return await bookRepository.aggreagate(agreagationQuery)
  }

  public async deleteBook(req): Promise<Book> {
    const query = {
      industryIdentifiers: req.body.industryIdentifiers
    };

    return await bookRepository.findOneAndDelete(query)
  }

  public async getBook(req): Promise<Book> {
    const query = {
      _id: req.params.bookId
    };

    return await bookRepository.findById(query)
  }

  public async getBookByIndustryIdentifiers(req): Promise<Book[]> {
    const query = {
      industryIdentifiers: {
        $in: req.query.industryIdentifiers
      }
    };

    return await bookRepository.find(query)
  }

  public async getUserBooks(req): Promise<AgreagationBookResponse> {
    let objIdBooks = req.query.books.map(el => mongoose.Types.ObjectId(el));
    const agreagateQuery = [{
      $match: {
          _id: {$in: objIdBooks}
        }
      }, 
      this.makeAgreagationQueryFor(listOfTable.categories),
      this.makeAgreagationQueryFor(listOfTable.authors),
      {
        $match: {
          title: {
            $regex: `.*${req.query.title? req.query.title: ' '}*`,
            $options: 'i'
          }, 
        }
      },
      this.makePaginationQuery(req),
    ];

    return await bookRepository.aggreagate(agreagateQuery)
  }

  public async getSomeBooks(req): Promise<AgreagationBookResponse> {
    const agreagateQuery = [
      this.makeAgreagationQueryFor(listOfTable.categories), 
      this.makeAgreagationQueryFor(listOfTable.authors),
      {
        $match: this.makeQueryFromLinkForSomeBooks(req)
      },
      this.makePaginationQuery(req),
    ];

    return await bookRepository.aggreagate(agreagateQuery)
  }

  public async updateBook(req): Promise<Book> {
    let authors = [];
    let categories = [];
    
    await authorRepository.find({name: {$in: req.body.authors}})
    .then((err, authorList) => {
      authors = this.makeObjectIdFrom(authorList)
    })

    await categoryRepository.find({name: {$in: req.body.authors}})
    .then((categoryList) => {
      categories = this.makeObjectIdFrom(categoryList)
    })

    const newBookData = {
      title: req.body.title,
      authors,
      categories,
      description: req.body.description,
      pageCount: req.body.pageCount,
      image: req.body.image
    }

    return await bookRepository.findOneAndUpdate(
      {industryIdentifiers: req.body.industryIdentifiers},
      newBookData,
    )
  }

  public async addBook(req): Promise<Book> {
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

    await categoryRepository.find(queryForCategory)
    .then(categoryList => {
      if (categoryList.length > 0) {
        listCategoriesId = this.makeObjectIdFrom(categoryList)
      }

      if (categoryList.length === 0) {
        req.body.book.categories.forEach(el => {
          const id = mongoose.Types.ObjectId()
          listCategories.push({
            _id: id,
            name: el,
            _v: 0
          });
          listCategoriesId.push(id)
        });
        categoryRepository.insertMany(listCategories);
      }
    })

    let queryForAuthor: object = req.body.book.authors_list ?
    { name: {
      $in: req.body.book.authors_list.map(el => {
        return el.name;
      })
    }}
    : { name: {
      $in: req.body.book.authors
    }};
  
    authorRepository.find(queryForAuthor)
    .then(authors => {
      if (authors.length > 0) {
        listAuthorsId = this.makeObjectIdFrom(authors)
        
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
          authorRepository.insertMany(listAuthors);
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
        authorRepository.insertMany(listAuthors);
      }
    })

    let industryIdentifiers = '';
    req.body.book.industryIdentifiers.forEach((obj: {type: string, identifier: string}) => {
      industryIdentifiers += obj.type + obj.identifier;
    });
  
    let queryForBook= {
      title: req.body.book.title,
      industryIdentifiers
    };

    let flagBookExist = false;

    await bookRepository.findOne(queryForBook)
    .then(book => {
      if (book) {
        flagBookExist = true
      }
    })

    if (flagBookExist === false) {
      const bookId = mongoose.Types.ObjectId();

      let newBook = {
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

      return await bookRepository.create(newBook)
    } else {
      throw(new Error('book already axist'))
    }
  }
}