"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.AuthorSchema = new mongoose.Schema({
    name: String
});
exports.Authors = mongoose.model('Author', exports.AuthorSchema);
//# sourceMappingURL=author.model.js.map