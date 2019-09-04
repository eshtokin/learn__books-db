"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const book_model_1 = require("../models/book.model");
const category_controller_1 = require("./category.controller");
const author_controller_1 = require("./author.controller");
const user_controller_1 = require("./user.controller");
const mongodb_service_1 = require("../service/mongodb.service");
exports.Books = mongoose.model('Books', book_model_1.BookSchema);
const mongoDbService = new mongodb_service_1.MongoDbService();
class BookController {
    getAllBook(req, res) {
        const skip = {
            $skip: (+req.query.pageIndex) * (+req.query.pageSize)
        };
        const limit = {
            $limit: (+req.query.pageSize)
        };
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
        const agreagationQuery = [{
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
        mongoDbService.Aggreagate(exports.Books, agreagationQuery)
            .then(list => {
            return res.json(list[0]);
        })
            .catch(err => res.send(err));
    }
    getSomeBooks(req, res) {
        const authorsFilter = [];
        const categoriesFilter = [];
        if (req.query.authors) {
            req.query.authors.forEach(author => {
                authorsFilter.push(mongoose.Types.ObjectId(author));
            });
        }
        if (req.query.categories) {
            req.query.categories.forEach(category => {
                categoriesFilter.push(mongoose.Types.ObjectId(category));
            });
        }
        const pagination = JSON.parse(req.query.pagination);
        const regExp = new RegExp(`.*${req.query.title ? req.query.title : ' '}*`);
        const queryTitle = req.query.title.length
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
        const skip = {
            $skip: pagination.pageIndex * pagination.pageSize
        };
        const limit = {
            $limit: pagination.pageSize
        };
        const query = {
            $and: [
                Object.assign({}, queryTitle),
                Object.assign({}, queryCategories),
                Object.assign({}, queryAuthors)
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
        mongoDbService.Aggreagate(exports.Books, agreagateQuery)
            .then(list => res.json(list))
            .catch(err => res.send(err));
    }
    getUserBooks(req, res) {
        let objIdBooks = req.query.books.map(el => mongoose.Types.ObjectId(el));
        const pagination = JSON.parse(req.query.pagination);
        const skip = {
            $skip: (+pagination.pageIndex) * (+pagination.pageSize)
        };
        const limit = {
            $limit: (+pagination.pageSize)
        };
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
        const agreagateQuery = [{
                $match: {
                    _id: { $in: objIdBooks }
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
                        $regex: `.*${req.query.title ? req.query.title : ' '}*`,
                        $options: 'i'
                    },
                }
            }, Object.assign({}, query)];
        mongoDbService.Aggreagate(exports.Books, agreagateQuery)
            .then(list => res.json(list))
            .catch(err => res.send(err));
    }
    addBook(req, res) {
        let listCategories = [];
        let listCategoriesId = [];
        let listAuthors = [];
        let listAuthorsId = [];
        let queryForCategory = req.body.book.categories_list ?
            { name: {
                    $in: req.body.book.categories_list.map(el => {
                        return el.name;
                    })
                } }
            : { name: {
                    $in: req.body.book.categories
                } };
        mongoDbService.find(category_controller_1.Category, queryForCategory)
            .then(category => {
            if (category.length > 0) {
                category.forEach(el => {
                    listCategoriesId.push(mongoose.Types.ObjectId(el._id));
                });
            }
            if (category.length === 0) {
                req.body.book.categories.forEach(el => {
                    const id = mongoose.Types.ObjectId();
                    listCategories.push({
                        _id: id,
                        name: el,
                        _v: 0
                    });
                    listCategoriesId.push(id);
                });
                mongoDbService.insertMany(category_controller_1.Category, listCategories);
            }
        })
            .catch(err => res.send(err));
        let queryForAuthor = req.body.book.authors_list ?
            { name: {
                    $in: req.body.book.authors_list.map(el => {
                        return el.name;
                    })
                } }
            : { name: {
                    $in: req.body.book.authors
                } };
        mongoDbService.find(author_controller_1.Authors, queryForAuthor)
            .then(authors => {
            if (authors.length > 0) {
                authors.forEach(author => {
                    listAuthorsId.push(mongoose.Types.ObjectId(author._id));
                });
                if (authors.length !== req.body.book.authors.length) {
                    req.body.book.authors.forEach(author => {
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
                    mongoDbService.insertMany(author_controller_1.Authors, listAuthors);
                }
            }
            if (authors.length === 0) {
                req.body.book.authors.forEach(el => {
                    const id = mongoose.Types.ObjectId();
                    listAuthors.push({
                        _id: id,
                        name: el,
                        _v: 0
                    });
                    listAuthorsId.push(id);
                });
                mongoDbService.insertMany(author_controller_1.Authors, listAuthors);
            }
        })
            .catch(err => res.send(err));
        let industryIdentifiers = '';
        req.body.book.industryIdentifiers.forEach((obj) => {
            industryIdentifiers += obj.type + obj.identifier;
        });
        let queryForBook = {
            title: req.body.book.title,
            industryIdentifiers //: req.body.book.industryIdentifiers
        };
        mongoDbService.findOne(exports.Books, queryForBook)
            .then(book => {
            if (book && req.body.user) {
                const query = {
                    _id: mongoose.Types.ObjectId(req.body.user.id)
                };
                const data = {
                    $addToSet: { books: book._id }
                };
                mongoDbService.findOneAndUpdate(user_controller_1.User, query, data)
                    .then(() => {
                    return res.status(200).send({
                        message: `added in bd and profile`
                    });
                })
                    .catch(err => res.send(err));
                return;
            }
            if (book) {
                return res.status(400).send({
                    message: `book already exist`
                });
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
            mongoDbService.create(exports.Books, query)
                .then(book => {
                return res.status(200).send({
                    message: 'added in bd'
                });
            })
                .catch(err => res.send(err));
        })
            .catch(err => res.send(err));
    }
    updateBook(req, res) {
        let authors = [];
        let categories = [];
        author_controller_1.Authors.find({ name: { $in: req.body.authors } }, (err, authorList) => {
            authorList.forEach(author => {
                authors.push(mongoose.Types.ObjectId(author._id));
            });
            category_controller_1.Category.find({ name: { $in: req.body.categories } }, (err, categoryList) => {
                categoryList.forEach(category => {
                    categories.push(mongoose.Types.ObjectId(category._id));
                });
                exports.Books.findOneAndUpdate({ industryIdentifiers: req.body.industryIdentifiers }, {
                    title: req.body.title,
                    authors,
                    categories,
                    description: req.body.description,
                    pageCount: req.body.pageCount,
                    image: req.body.image
                }, (err, book) => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.status(200).send({
                        message: 'Successfuy updated'
                    });
                });
            });
        });
    }
    deleteBook(req, res) {
        const query = {
            industryIdentifiers: req.body.industryIdentifiers
        };
        mongoDbService.findOneAndDelete(exports.Books, query)
            .then(() => {
            return res.status(200).send({
                message: 'successfuly deleted'
            });
        })
            .catch(err => res.send(err));
    }
    getBook(req, res) {
        const query = {
            _id: req.params.bookId
        };
        mongoDbService.findById(exports.Books, query)
            .then(book => {
            return res.json(book);
        })
            .catch(err => res.send(err));
    }
    getBookByIndustryIdentifiers(req, res) {
        const arrayOfIndustryIdentifiers = [];
        req.query.industryIdentifiers.forEach(string => {
            arrayOfIndustryIdentifiers.push(JSON.parse(string));
        });
        const query = {
            industryIdentifiers: {
                $in: arrayOfIndustryIdentifiers
            }
        };
        mongoDbService.find(exports.Books, query)
            .then(book => res.json(book))
            .catch(err => res.send(err));
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map