"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const book_model_1 = require("../models/book.model");
exports.Books = mongoose.model('Books', book_model_1.BookSchema);
class BookController {
    getAllBook(req, res) {
        exports.Books.find({}, (err, books) => {
            if (err) {
                res.send(err);
            }
            res.json(books);
        });
    }
    addBook(req, res) {
        exports.Books.findOne({ title: req.body.title, authors: req.body.authors }, (err, book) => {
            if (err) {
                return res.status(500).send({
                    message: `error on the server`
                });
            }
            if (book) {
                return res.status(400).send({
                    message: `book already exist`
                });
            }
            exports.Books.create({
                title: req.body.title,
                authors: req.body.authors,
                categories: req.body.categories,
                description: req.body.description,
                image: req.body.image,
                pageCount: req.body.pageCount,
                printType: req.body.printType,
                id: mongoose.Types.ObjectId(),
            }, (err, book) => {
                res.status(200).send({
                    message: `successful`
                });
            });
        });
    }
    deleteBook(req, res) {
        exports.Books.findOneAndDelete({ title: req.body.title }, (err) => {
            if (err) {
                return res.send(err);
            }
            return res.status(200).send({
                message: 'successfuly deleted'
            });
        });
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map