"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = require("./../services/category.service");
const categoryService = new category_service_1.default();
class CategoryController {
    getAllCategory(req, res) {
        categoryService.getAllCategory()
            .then(value => res.send(value))
            .catch(err => {
            res.send(err);
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map