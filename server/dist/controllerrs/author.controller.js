"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const author_model_1 = require("../entities/author.model");
const author_repository_1 = require("repositories/author.repository");
exports.Authors = mongoose.model('Author', author_model_1.AuthorSchema);
const RAuthor = new author_repository_1.default(exports.Authors, 'authors');
class AuthorController {
    getAllAuthor(req, res) {
        const query = {};
        RAuthor.find(query)
            .then(value => {
            res.send(value);
        })
            .catch(err => res.send(err));
    }
    getAuthor(req, res) {
        const query = req.params.authorId;
        RAuthor.findById(query)
            .then(value => {
            res.send(value);
        })
            .catch(err => res.send(err));
    }
    addAuthor(req, res) {
        RAuthor.findOne({ name: req.body.name })
            .then(value => {
            return res.status(400).send({
                meessage: 'author already exist'
            });
        })
            .catch(err => {
            return res.status(500).send({
                message: 'error on the server'
            });
        });
        const data = {
            name: req.body.name
        };
        RAuthor.create(data)
            .then(res.status(200).send({
            message: 'successful'
        }))
            .catch(err => res.status(500).send({
            message: 'error on the server'
        }));
    }
    deleteAuthor(req, res) {
        const query = { name: req.body.name };
        RAuthor.findOneAndDelete(query)
            .then(value => {
            return res.send({ message: "successfuly deleted" });
        })
            .catch(err => res.send(err));
    }
}
exports.AuthorController = AuthorController;
//# sourceMappingURL=author.controller.js.map