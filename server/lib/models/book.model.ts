import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BookSchema = new Schema({
  title: String,
  authors: Array,
  categories: Array,
  description: String,
  image: String,
  pageCount: Number,
  printType: String,
  industryIdentifiers: String
});
