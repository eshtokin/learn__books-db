"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const category_model_1 = require("../models/category.model");
const mongodb_service_1 = require("../service/mongodb.service");
exports.Category = mongoose.model('Category', category_model_1.CategorySchema);
const mongoDbService = new mongodb_service_1.MongoDbService();
class CategoryController {
    getAllCategory(req, res) {
        const query = {};
        mongoDbService.find(exports.Category, query)
            .then(value => {
            res.send(value);
        })
            .catch(err => {
            res.send(err);
        });
    }
    addCategory(req, res) {
        const query = {
            name: req.body.name
        };
        mongoDbService.findOne(exports.Category, query)
            .then(value => {
            if (value) {
                return res.status(400).send({
                    message: 'category already exist'
                });
            }
            mongoDbService.create(exports.Category, query)
                .then(() => {
                return res.status(200).send({
                    message: 'successful'
                });
            });
        })
            .catch(err => {
            res.status(500).send({
                message: 'error on the server'
            });
        });
    }
    deleteCategory(req, res) {
        const query = {
            name: req.body.name
        };
        mongoDbService.findOneAndDelete(exports.Category, query)
            .then(() => {
            return res.status(200).send({
                message: 'successfuly deleted'
            });
        })
            .catch(err => {
            return res.send(err);
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map