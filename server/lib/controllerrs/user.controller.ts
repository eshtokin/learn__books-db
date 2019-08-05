import * as mongoose from "mongoose"
import { UserSchema } from "../models/user.model"
import { Request, Response } from "express"
import { Books } from "./book.controller";

export const User = mongoose.model('User', UserSchema);

export class UserController {

    public getAllUsers(req: Request, res: Response) {
        User.aggregate([{
            $lookup: {
              from: "books",
              localField: "books",
              foreignField: "_id",
              as: "book_list"
            }
          }], (err, list) => {
            res.json(list)
        })
    }
    
    public getUserById(req: Request, res: Response) {           
        User.findById(req.params.userId, (err, user) => {
            if (err){
                return res.send(err);
            }
            return res.json(user);
        });
    }

    public updateUser(req: Request, res: Response) {
        console.log('work');

        let bookList = req.body.books.map(el => mongoose.Types.ObjectId(el));
        
        User.findOneAndUpdate({_id: req.params.userId}, { books: bookList }, {new:true}, (err, user) => {
            if (err) {
                res.send(err)
            }
            res.json(user)
        })
    }

    public deleteUser(req: Request, res: Response) {
        User.findOneAndDelete({_id: req.params.userId}, (err, user) => {
            if (err) {
                res.send(err)
            }
            res.json({message: 'User successfully deleted!'})
        })
    }
}