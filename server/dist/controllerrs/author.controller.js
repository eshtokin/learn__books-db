"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const author_model_1 = require("../models/author.model");
const Authors = mongoose.model('Author', author_model_1.AuthorSchema);
class AuthorController {
    getAllAuthor(req, res) {
        Authors.find({}, (err, authors) => {
            if (err) {
                res.send(err);
            }
            res.send(authors);
        });
    }
    addAuthor(req, res) {
        Authors.findOne({ name: req.body.name }, (err, author) => {
            if (err) {
                return res.status(500).send({
                    message: 'error on the server'
                });
            }
            if (author) {
                return res.status(400).send({
                    meessage: 'author already exist'
                });
            }
            Authors.create({
                name: req.body.name
            }, (err, author) => {
                res.status(200).send({
                    message: 'successful'
                });
            });
        });
    }
    deleteAuthor(req, res) {
        Authors.findOneAndDelete({ name: req.body.name }, (err) => {
            if (err) {
                return res.send(err);
            }
            return res.send({
                meessage: 'successfuly deleted'
            });
        });
    }
}
exports.AuthorController = AuthorController;
//# sourceMappingURL=author.controller.js.map