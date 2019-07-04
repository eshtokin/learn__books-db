"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_model_1 = require("../models/user.model");
const User = mongoose.model('User', user_model_1.UserSchema);
class UserController {
    addNewUser(req, res) {
        let newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    // public getUserById(req: Request, res: Response) {
    //     User.findOne({_id: req.params.userId}, (err, user) => {
    //         if (err) {
    //             res.send(err)
    //         }
    //         res.json(user)
    //     })
    // }
    getUserById(req, res) {
        User.findById(req.params.contactId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    getAllUsers(req, res) {
        User.find({}, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    }
    updateUser(req, res) {
        User.findByIdAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    deleteUser(req, res) {
        User.findByIdAndRemove({ _id: req.params.userId }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User successfully deleted!' });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map