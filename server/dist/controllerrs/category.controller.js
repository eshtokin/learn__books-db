"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const category_model_1 = require("../models/category.model");
exports.Category = mongoose.model('Category', category_model_1.CategorySchema);
class CategoryController {
    getAllCategory(req, res) {
        exports.Category.find({}, (err, categories) => {
            if (err) {
                res.send(err);
            }
            res.json(categories);
        });
    }
    addCategory(req, res) {
        exports.Category.findOne({ name: req.body.name }, (err, category) => {
            if (err) {
                return res.status(500).send({
                    message: 'error on the server'
                });
            }
            if (category) {
                return res.status(400).send({
                    message: 'category already exist'
                });
            }
            exports.Category.create({
                name: req.body.name
            }, (err, category) => {
                res.status(200).send({
                    message: 'successful'
                });
            });
        });
    }
    deleteCategory(req, res) {
        exports.Category.findOneAndDelete({ name: req.body.name }, (err) => {
            if (err) {
                return res.send(err);
            }
            res.status(200).send({
                message: 'successfuly deleted'
            });
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map