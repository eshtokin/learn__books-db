"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const category_model_1 = require("../entities/category.model");
const category_repository_1 = require("repositories/category.repository");
exports.Category = mongoose.model('Category', category_model_1.CategorySchema);
const RCategory = new category_repository_1.default(exports.Category, 'categories');
class CategoryController {
    getAllCategory(req, res) {
        const query = {};
        RCategory.find(query)
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
        RCategory.findOne(query)
            .then(value => {
            if (value) {
                return res.status(400).send({
                    message: 'category already exist'
                });
            }
            RCategory.create(query)
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
        RCategory.findOneAndDelete(query)
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