import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BookSchema = new Schema({
  title: String,
  authors: String,
  categories: [],
  description: String,
  avatar: String,
  pageCount: Number,
  type: String
});
