"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const author_model_1 = require("./../entities/author.model");
const author_repository_1 = require("./../repositories/author.repository");
const author_service_1 = require("./../services/author.service");
exports.authorRepository = new author_repository_1.default(author_model_1.Authors);
const serviceAuthor = new author_service_1.default();
class AuthorController {
    getAllAuthor(req, res) {
        serviceAuthor.getAllAuthor()
            .then((value) => {
            res.send(value);
        });
    }
    addAuthor(req, res) {
        serviceAuthor.addAuthor(req.body.name);
    }
}
exports.AuthorController = AuthorController;
//# sourceMappingURL=author.controller.js.map