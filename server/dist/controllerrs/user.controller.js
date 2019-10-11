"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("./../services/user.service");
const userService = new user_service_1.default();
class UserController {
    getAllUsers(req, res) {
        userService.getAllUsers(req.query.pagination)
            .then(result => res.status(200).send(result))
            .catch(err => res.send(err));
    }
    getUserByFilter(req, res) {
        userService.getUserByFilter(req.query)
            .then(result => res.status(200).send(result))
            .catch(err => res.send(err));
    }
    getUserById(req, res) {
        userService.getUserById(req.params.userId)
            .then(value => res.json(value))
            .catch(err => res.send(err));
    }
    getFavoriteBookFromUser(req, res) {
        userService.getFavoriteBookFromUser(req.headers.authorization)
            .then(result => res.status(200).send(result))
            .catch(err => res.send(err));
    }
    updateUser(req, res) {
        userService.updateUser(req.body)
            .then(value => res.json(value))
            .catch(err => res.send(err));
    }
    deleteUser(req, res) {
        userService.deleteUser(req)
            .then(() => res.send({
            message: 'User successfully deleted!'
        }))
            .catch(err => res.send(err));
    }
    addBookToProfile(req, res) {
        userService.addBookToProfile(req.headers.authorization, req.params.bookId)
            .then(() => res.status(200).send({
            message: 'added to profile'
        }))
            .catch(err => res.status(500).send(err));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map