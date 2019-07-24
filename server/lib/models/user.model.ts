import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    email: String,
    password: String,
    name: String,
    books: Array,
    role: Number
});

export enum UserRoles {
    admin = 1, 
    user = 2
}