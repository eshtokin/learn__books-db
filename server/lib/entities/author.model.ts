import * as mongoose from 'mongoose'

export const AuthorSchema = new mongoose.Schema({
  name: String
})

export const Authors = mongoose.model('Author', AuthorSchema);
