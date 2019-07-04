"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_model_1 = require("../models/user.model");
exports.User = mongoose.model('User', user_model_1.UserSchema);
class UserController {
    addNewUser(req, res) {
        let newUser = new exports.User(req.body);
        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    getAllUsers(req, res) {
        exports.User.find({}, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    }
    getUserById(req, res) {
        exports.User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    updateUser(req, res) {
        exports.User.findByIdAndUpdate(req.params.userId, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    deleteUser(req, res) {
        exports.User.findByIdAndRemove(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User successfully deleted!' });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map