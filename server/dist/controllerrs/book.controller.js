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
    addBook(res, req) {
        exports.Books.create({
            title: req.body.title,
            authors: req.body.authors
        }, (err, book) => {
            res.status(200).send({
                message: 'successful'
            });
        });
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map