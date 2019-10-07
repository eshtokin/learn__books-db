"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_model_1 = require("../entities/user.model");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user_repository_1 = require("./../repositories/user.repository");
exports.User = mongoose.model('User', user_model_1.UserSchema);
exports.RUser = new user_repository_1.default(exports.User, 'users');
class UserController {
    getAllUsers(req, res) {
        const skip = {
            $skip: (+req.query.pageIndex) * (+req.query.pageSize)
        };
        const limit = {
            $limit: (+req.query.pageSize)
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
        const agreagationQuery = [
            {
                $lookup: {
                    from: "books",
                    localField: "books",
                    foreignField: "_id",
                    as: "book_list"
                }
            },
            Object.assign({}, query)
        ];
        exports.RUser.Aggreagate(agreagationQuery)
            .then(result => {
            return res.status(200).send(result);
        })
            .catch(err => {
            return res.send(err);
        });
    }
    getSomeUser(req, res) {
        const pagination = JSON.parse(req.query.pagination);
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
        const agreagationQuery = [
            {
                $match: {
                    email: {
                        $regex: `.*${req.query.searchString ? req.query.searchString : ' '}*`,
                        $options: 'i'
                    }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "books",
                    foreignField: "_id",
                    as: "book_list"
                }
            },
            Object.assign({}, query)
        ];
        exports.RUser.Aggreagate(agreagationQuery)
            .then(result => {
            return res.status(200).send(result);
        })
            .catch(err => {
            return res.send(err);
        });
    }
    getUserById(req, res) {
        const query = {
            _id: req.params.userId
        };
        exports.RUser.findById(query)
            .then(value => {
            value.password = '';
            return res.json(value);
        })
            .catch(err => {
            return res.send(err);
        });
    }
    getFavoriteBookFromUser(req, res) {
        const user = jwt.decode(req.headers.authorization);
        const query = {
            _id: user.id
        };
        exports.RUser.find(query)
            .then(result => {
            return res.json(result[0].books);
        })
            .catch(err => {
            return res.send(err);
        });
    }
    updateUser(req, res) {
        const data = req.body;
        if (req.body.password === '') {
            delete data.password;
        }
        else if (req.body.password[0] !== '$') {
            data.password = crypt.hashSync(req.body.password);
        }
        if (req.body.books) {
            data.books = req.body.books.map(book => {
                return mongoose.Types.ObjectId(book);
            });
        }
        const query = {
            _id: req.body._id
        };
        exports.RUser.findOneAndUpdate(query, data)
            .then(value => {
            return res.json(value);
        })
            .catch(err => {
            return res.send(err);
        });
    }
    deleteUser(req, res) {
        const query = {
            _id: req.params.userId
        };
        exports.RUser.findOneAndDelete(query)
            .then(() => {
            return res.send({
                message: 'User successfully deleted!'
            });
        })
            .catch(err => {
            return res.send(err);
        });
    }
    addBookToProfile(req, res) {
        const user = jwt.decode(req.headers.authorization);
        const query = {
            _id: mongoose.Types.ObjectId(user.id)
        };
        const data = {
            $addToSet: { books: mongoose.Types.ObjectId(req.params.bookId) }
        };
        exports.RUser.findOneAndUpdate(query, data)
            .then(() => {
            return res.status(200).send({
                message: 'added to profile'
            });
        })
            .catch(err => {
            return res.send;
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map