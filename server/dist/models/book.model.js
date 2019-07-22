"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.BookSchema = new Schema({
    title: String,
    authors: String
});
//# sourceMappingURL=book.model.js.map