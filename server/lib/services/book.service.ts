import * as mongoose from 'mongoose'
import BookRepository from './../repositories/book.repository';
import { Books } from './../entities/book.model';
import { authorRepository } from './../services/author.service';
import { categoryRepository } from './../services/category.service';
import { AgreagationBookResponse } from 'models/agreagation-response.model';
import Book from 'models/book.model';
import { BookFilter } from 'models/request/book-controller/get-books-by-filter.model';

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
    console.log('resultArrWithObjId', resultArrWithObjId);
    return resultArrWithObjId;
  }

  public makeQueryFromLinkForSomeBooks(req) {
    let authorsFilter = [];
    let categoriesFilter = [];
    if (req.authors) {
      authorsFilter = this.makeObjectIdFrom(req.authors)
    }
    if (req.categories) {
      categoriesFilter = this.makeObjectIdFrom(req.categories)
    }

    const regExp = new RegExp(`.*${req.title? req.title: ' '}*`);

    const queryTitle =  (req.title !== undefined && req.title.length > 0)
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

  public makePaginationQuery(paginationQuery) {
    const pagination = JSON.parse(paginationQuery);

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

  public async getAllBook(pagination: string): Promise<AgreagationBookResponse> {
    const agreagationQuery: object[] = [
      this.makeAgreagationQueryFor(listOfTable.categories),
      this.makeAgreagationQueryFor(listOfTable.authors),
      this.makePaginationQuery(pagination)
    ];
    return await bookRepository.aggreagate(agreagationQuery)
  }

  public async deleteBook(bookfromQuery: string): Promise<Book> {
    const book = JSON.parse(bookfromQuery)
    const query = {
      industryIdentifiers: book.industryIdentifiers
    };

    return await bookRepository.findOneAndDelete(query)
  }

  public async getBookByIndustryIdentifiers(identifiers: string[]): Promise<Book[]> {
    const query = {
      industryIdentifiers: {
        $in: identifiers
      }
    };

    return await bookRepository.find(query)
  }

  public async getUserBooks(books: string[], pagination: string, title: string): Promise<AgreagationBookResponse> {
    let objIdBooks = books.map(el => mongoose.Types.ObjectId(el));
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
            $regex: `.*${title? title: ' '}*`,
            $options: 'i'
          }, 
        }
      },
      this.makePaginationQuery(pagination),
    ];

    return await bookRepository.aggreagate(agreagateQuery)
  }

  public async getBooksByFitler(data): Promise<AgreagationBookResponse> {
    const agreagateQuery = [
      this.makeAgreagationQueryFor(listOfTable.categories), 
      this.makeAgreagationQueryFor(listOfTable.authors),
      {
        $match: this.makeQueryFromLinkForSomeBooks(data)
      },
      this.makePaginationQuery(data.pagination),
    ];

    const result = await bookRepository.aggreagate(agreagateQuery);
    
    return result;
  }

  public async updateBook(book: Book): Promise<Book> {
    const authorList = await authorRepository.find({name: {$in: book.authors}})
    const authors = this.makeObjectIdFrom(authorList);

    const categoryList = await categoryRepository.find({name: {$in: book.authors}})
    const categories = this.makeObjectIdFrom(categoryList)
    
    const newBookData = {
      title: book.title,
      authors,
      categories,
      description: book.description,
      pageCount: book.pageCount,
      image: book.image
    }

    return await bookRepository.findOneAndUpdate(
      {industryIdentifiers: book.industryIdentifiers},
      newBookData,
    )
  }

  public async addBook(book: Book): Promise<Book> {
    let listCategories = [];
    let listCategoriesId = [];
    let listAuthors = [];
    let listAuthorsId =[];

    let queryForCategory: object = book.categories_list ?
    { name: {
      $in: book.categories_list.map(el => {
        return el.name;
      })
    }}
    : { name: {
      $in: book.categories
    }};

    await categoryRepository.find(queryForCategory)
    .then(categoryList => {
      if (categoryList.length > 0) {
        listCategoriesId = this.makeObjectIdFrom(categoryList)
      }

      if (categoryList.length === 0) {
        book.categories.forEach(el => {
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

    let queryForAuthor: object = book.authors_list ?
    { name: {
      $in: book.authors_list.map(el => {
        return el.name;
      })
    }}
    : { name: {
      $in: book.authors
    }};
  
    authorRepository.find(queryForAuthor)
    .then(authors => {
      if (authors.length > 0) {
        listAuthorsId = this.makeObjectIdFrom(authors)
        
        if (authors.length !== book.authors.length) {
          book.authors.forEach(author => {
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
        book.authors.forEach(el => {
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
    (book.industryIdentifiers as []).forEach((obj: {type: string, identifier: string}) => {
      industryIdentifiers += obj.type + obj.identifier;
    });
  
    let queryForBook= {
      title: book.title,
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
        title: book.title,
        authors: listAuthorsId,
        categories: listCategoriesId,
        description: book.description,
        image: book.image,
        pageCount: book.pageCount,
        printType: book.printType,
        industryIdentifiers
      };

      return await bookRepository.create(newBook)
    } else {
      throw(new Error('book already axist'))
    }
  }
}