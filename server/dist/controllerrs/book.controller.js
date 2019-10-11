"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_service_1 = require("./../services/book.service");
const bookService = new book_service_1.default();
class BookController {
    getAllBook(req, res) {
        bookService.getAllBook(req.query.pagination)
            .then(list => res.json(list[0]));
    }
    getBooksByFitler(req, res) {
        bookService.getBooksByFitler(req.query)
            .then(list => res.json(list))
            .catch(err => res.send(err));
    }
    getUserBooks(req, res) {
        const params = req.query;
        bookService.getUserBooks(params.books, params.pagination, params.title)
            .then(list => res.json(list))
            .catch(err => res.send(err));
    }
    addBook(req, res) {
        bookService.addBook(req.body.book)
            .then(() => res.status(200).send({
            message: 'added in bd'
        }))
            .catch(err => res.send(err));
    }
    updateBook(req, res) {
        bookService.updateBook(req.query.book)
            .then(() => res.status(200).send({
            massage: 'Successfuly updated'
        }))
            .catch(err => res.send(err));
    }
    deleteBook(req, res) {
        bookService.deleteBook(req.query.book)
            .then(() => res.status(200).send({
            message: 'successfuly deleted'
        }))
            .catch(err => res.send(err));
    }
    // public getBook(req: Request, res: Response) {
    //   bookService.getBook(req)
    //   .then(book => {
    //     return res.json(book)
    //   })
    //   .catch(err => res.send(err))
    // }
    getBookByIndustryIdentifiers(req, res) {
        bookService.getBookByIndustryIdentifiers(req.query.industryIdentifiers)
            .then(book => res.json(book))
            .catch(err => res.send(err));
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map