"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const author_model_1 = require("../models/author.model");
const mongodb_service_1 = require("../service/mongodb.service");
exports.Authors = mongoose.model('Author', author_model_1.AuthorSchema);
const mongoDbService = new mongodb_service_1.MongoDbService();
class AuthorController {
    getAllAuthor(req, res) {
        const query = {};
        mongoDbService.find(exports.Authors, query)
            .then(value => {
            res.send(value);
        })
            .catch(err => res.send(err));
    }
    getAuthor(req, res) {
        const query = req.params.authorId;
        mongoDbService.findById(exports.Authors, query)
            .then(value => {
            res.send(value);
        })
            .catch(err => res.send(err));
    }
    addAuthor(req, res) {
        mongoDbService.findOne(exports.Authors, { name: req.body.name })
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
        mongoDbService.create(exports.Authors, data)
            .then(res.status(200).send({
            message: 'successful'
        }))
            .catch(err => res.status(500).send({
            message: 'error on the server'
        }));
    }
    deleteAuthor(req, res) {
        const query = { name: req.body.name };
        mongoDbService.findOneAndDelete(exports.Authors, query)
            .then(value => {
            return res.send({ message: "successfuly deleted" });
        })
            .catch(err => res.send(err));
    }
}
exports.AuthorController = AuthorController;
//# sourceMappingURL=author.controller.js.map