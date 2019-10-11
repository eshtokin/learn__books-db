"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const book_repository_1 = require("./../repositories/book.repository");
const book_model_1 = require("./../entities/book.model");
const author_service_1 = require("./../services/author.service");
const category_service_1 = require("./../services/category.service");
const listOfTable = {
    categories: 'categories',
    books: 'books',
    authors: 'authors',
};
exports.bookRepository = new book_repository_1.default(book_model_1.Books);
class BookService {
    makeObjectIdFrom(arr) {
        return arr.map(id => {
            return mongoose.Types.ObjectId(id);
        });
    }
    makeQueryFromLinkForSomeBooks(req) {
        let authorsFilter = [];
        let categoriesFilter = [];
        if (req.authors) {
            authorsFilter = this.makeObjectIdFrom(req.authors);
        }
        if (req.categories) {
            categoriesFilter = this.makeObjectIdFrom(req.categories);
        }
        const regExp = new RegExp(`.*${req.title ? req.title : ' '}*`);
        const queryTitle = (req.title !== undefined && req.title.length > 0)
            ? {
                $or: [
                    { title: { $regex: regExp, $options: 'i' } },
                    { 'authors_list.name': { $regex: regExp, $options: 'i' } },
                    { 'categories_list.name': { $regex: regExp, $options: 'i' } }
                ]
            }
            : {};
        const queryCategories = categoriesFilter.length > 0 ? { categories: { $in: categoriesFilter } } : {};
        const queryAuthors = authorsFilter.length > 0 ? { authors: { $in: authorsFilter } } : {};
        const query = {
            $and: [
                Object.assign({}, queryTitle),
                Object.assign({}, queryCategories),
                Object.assign({}, queryAuthors)
            ]
        };
        return query;
    }
    makePaginationQuery(paginationQuery) {
        const pagination = JSON.parse(paginationQuery);
        const skip = {
            $skip: (pagination.pageIndex) * (pagination.pageSize)
        };
        const limit = {
            $limit: (pagination.pageSize)
        };
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
    makeAgreagationQueryFor(query) {
        return {
            $lookup: {
                from: query,
                localField: query,
                foreignField: "_id",
                as: `${query}_list`
            }
        };
    }
    getAllBook(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const agreagationQuery = [
                this.makeAgreagationQueryFor(listOfTable.categories),
                this.makeAgreagationQueryFor(listOfTable.authors),
                this.makePaginationQuery(pagination)
            ];
            return yield exports.bookRepository.aggreagate(agreagationQuery);
        });
    }
    deleteBook(bookfromQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = JSON.parse(bookfromQuery);
            const query = {
                industryIdentifiers: book.industryIdentifiers
            };
            return yield exports.bookRepository.findOneAndDelete(query);
        });
    }
    getBookByIndustryIdentifiers(identifiers) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                industryIdentifiers: {
                    $in: identifiers
                }
            };
            return yield exports.bookRepository.find(query);
        });
    }
    getUserBooks(books, pagination, title) {
        return __awaiter(this, void 0, void 0, function* () {
            let objIdBooks = books.map(el => mongoose.Types.ObjectId(el));
            const agreagateQuery = [{
                    $match: {
                        _id: { $in: objIdBooks }
                    }
                },
                this.makeAgreagationQueryFor(listOfTable.categories),
                this.makeAgreagationQueryFor(listOfTable.authors),
                {
                    $match: {
                        title: {
                            $regex: `.*${title ? title : ' '}*`,
                            $options: 'i'
                        },
                    }
                },
                this.makePaginationQuery(pagination),
            ];
            return yield exports.bookRepository.aggreagate(agreagateQuery);
        });
    }
    getBooksByFitler(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const agreagateQuery = [
                this.makeAgreagationQueryFor(listOfTable.categories),
                this.makeAgreagationQueryFor(listOfTable.authors),
                {
                    $match: this.makeQueryFromLinkForSomeBooks(data)
                },
                this.makePaginationQuery(data.pagination),
            ];
            const result = yield exports.bookRepository.aggreagate(agreagateQuery);
            return result;
        });
    }
    updateBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorList = yield author_service_1.authorRepository.find({ name: { $in: book.authors } });
            const authors = this.makeObjectIdFrom(authorList);
            const categoryList = yield category_service_1.categoryRepository.find({ name: { $in: book.authors } });
            const categories = this.makeObjectIdFrom(categoryList);
            const newBookData = {
                title: book.title,
                authors,
                categories,
                description: book.description,
                pageCount: book.pageCount,
                image: book.image
            };
            return yield exports.bookRepository.findOneAndUpdate({ industryIdentifiers: book.industryIdentifiers }, newBookData);
        });
    }
    addBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            let listCategories = [];
            let listCategoriesId = [];
            let listAuthors = [];
            let listAuthorsId = [];
            let queryForCategory = book.categories_list ?
                { name: {
                        $in: book.categories_list.map(el => {
                            return el.name;
                        })
                    } }
                : { name: {
                        $in: book.categories
                    } };
            const categoryList = yield category_service_1.categoryRepository.find(queryForCategory);
            if (categoryList.length > 0) {
                listCategoriesId = this.makeObjectIdFrom(categoryList);
            }
            if (categoryList.length === 0) {
                book.categories.forEach(el => {
                    const id = mongoose.Types.ObjectId();
                    listCategories.push({
                        _id: id,
                        name: el,
                        _v: 0
                    });
                    listCategoriesId.push(id);
                });
                category_service_1.categoryRepository.insertMany(listCategories);
            }
            let queryForAuthor = book.authors_list ?
                { name: {
                        $in: book.authors_list.map(el => {
                            return el.name;
                        })
                    } }
                : { name: {
                        $in: book.authors
                    } };
            const authors = yield author_service_1.authorRepository.find(queryForAuthor);
            if (authors.length > 0) {
                listAuthorsId = this.makeObjectIdFrom(authors);
                if (authors.length !== book.authors.length) {
                    book.authors.forEach(author => {
                        authors.forEach(auth => {
                            if (auth.name !== author) {
                                const id = mongoose.Types.ObjectId();
                                listAuthors.push({
                                    _id: id,
                                    name: author,
                                    _v: 0
                                });
                                listAuthorsId.push(id);
                            }
                        });
                    });
                    author_service_1.authorRepository.insertMany(listAuthors);
                }
            }
            if (authors.length === 0) {
                book.authors.forEach(el => {
                    const id = mongoose.Types.ObjectId();
                    listAuthors.push({
                        _id: id,
                        name: el,
                        _v: 0
                    });
                    listAuthorsId.push(id);
                });
                author_service_1.authorRepository.insertMany(listAuthors);
            }
            let industryIdentifiers = '';
            book.industryIdentifiers.forEach((obj) => {
                industryIdentifiers += obj.type + obj.identifier;
            });
            let queryForBook = {
                title: book.title,
                industryIdentifiers
            };
            let flagBookExist = false;
            const bookFromRepository = yield exports.bookRepository.findOne(queryForBook);
            if (bookFromRepository) {
                flagBookExist = true;
            }
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
                return yield exports.bookRepository.create(newBook);
            }
            else {
                throw (new Error('book already axist'));
            }
        });
    }
}
exports.default = BookService;
//# sourceMappingURL=book.service.js.map