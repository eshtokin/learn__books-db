"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
    email: String,
    password: String,
    name: String,
    role: Number
});
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["admin"] = 1] = "admin";
    UserRoles[UserRoles["user"] = 2] = "user";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
//# sourceMappingURL=user.model.js.map