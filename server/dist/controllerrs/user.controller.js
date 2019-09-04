"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_model_1 = require("../models/user.model");
const mongodb_service_1 = require("../service/mongodb.service");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.User = mongoose.model('User', user_model_1.UserSchema);
const mongoDbService = new mongodb_service_1.MongoDbService();
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
                users: [
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
        mongoDbService.Aggreagate(exports.User, agreagationQuery)
            .then(result => {
            return res.send(result);
        })
            .catch(err => {
            return res.send(err);
        });
    }
    getSomeUser(req, res) {
        const pagination = JSON.parse(req.query.pagination);
        const skip = {
            $skip: (+pagination.pageIndex) * (+pagination.pageSize)
        };
        const limit = {
            $limit: (+pagination.pageSize)
        };
        let query = {
            $facet: {
                users: [
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
        mongoDbService.Aggreagate(exports.User, agreagationQuery)
            .then(result => {
            return res.send(result);
        })
            .catch(err => {
            return res.send(err);
        });
    }
    getUserById(req, res) {
        const query = {
            _id: req.params.userId
        };
        mongoDbService.findById(exports.User, query)
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
            _id: mongoose.Types.ObjectId(user.id)
        };
        mongoDbService.find(exports.User, query)
            .then(result => {
            return res.json(result[0].books);
        })
            .catch(err => {
            return res.send(err);
        });
    }
    updateUser(req, res) {
        const data = req.body;
        if (req.body.password[0] !== '$') {
            data.password = crypt.hashSync(req.body.password);
        }
        if (req.body.books) {
            const bookArray = req.body.books.map(book => {
                return mongoose.Types.ObjectId(book);
            });
            data.books = bookArray;
        }
        const query = {
            _id: req.body._id
        };
        mongoDbService.findOneAndUpdate(exports.User, query, data)
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
        mongoDbService.findOneAndDelete(exports.User, query)
            .then(() => {
            return res.send({
                message: 'User successfully deleted!'
            });
        })
            .catch(err => {
            return res.send(err);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map