"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.CategorySchema = new Schema({
    name: String
});
exports.Category = mongoose.model('Category', exports.CategorySchema);
//# sourceMappingURL=category.model.js.map