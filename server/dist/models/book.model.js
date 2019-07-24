"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.BookSchema = new Schema({
    title: String,
    authors: Array,
    categories: Array,
    description: String,
    image: String,
    pageCount: Number,
    printType: String,
    id: {}
});
//# sourceMappingURL=book.model.js.map