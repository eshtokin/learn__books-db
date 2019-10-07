import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const CategorySchema = new Schema({
  name: String
})

export const Category = mongoose.model('Category', CategorySchema);
