import * as mongoose from "mongoose"
import { UserSchema } from "../models/user.model"
import { Request, Response } from "express"
import { MongoDbService } from "../service/mongodb.service";
import * as crypt from "bcryptjs"

export const User = mongoose.model('User', UserSchema);

const mongoDbService = new MongoDbService();

export class UserController {
    public count(req: Request, res: Response) {
        mongoDbService.count(User)
        .then(count => res.json(count))
        .catch(err => res.send(err))
      }

    public getAllUsers(req: Request, res: Response) {
        const query = [
            {
                $lookup: {
                    from: "books",
                    localField: "books",
                    foreignField: "_id",
                    as: "book_list"
                }
            }
        ];

        mongoDbService.Aggreagate(User, query)
        .then(result => {
            return res.send(result)
        })
        .catch(err => {
            return res.send(err)
        })
    }
    
    public getSomeUser(req: Request, res: Response) {
        const query = [
            {
                $match: {
                    email: {
                        $regex: `.*${req.query.searchString? req.query.searchString : ' '}*`,
                        $options: 'i'
                    }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "books",
                    foreignField: "_id",
                    as: "book_list"
                }
            }
        ];

        mongoDbService.Aggreagate(User, query)
        .then(result => {
            return res.send(result)
        })
        .catch(err => {
            return res.send(err)
        })
    }

    public getUserById(req: Request, res: Response) {
        const query = {
            _id: req.params.userId
        }
        mongoDbService.findById(User, query)
        .then(value => {
            value.password = '';
            return res.json(value);
        })
        .catch(err => {
            return res.send(err);
        })
    }

    public updateUser(req: Request, res: Response) {
        const data = req.body;
        
        if (req.body.password[0] !== '$') {
            data.password = crypt.hashSync(req.body.password)
        }
        
        if (req.body.books) {
            const bookArray = req.body.books.map(book => {
                return mongoose.Types.ObjectId(book)
            })
            data.books = bookArray;
        }
  
        const query = {
            _id: req.body._id
        };
       
        mongoDbService.findOneAndUpdate(User, query, data)
        .then(value => {
            return res.json(value)
        })
        .catch(err => {
            return res.send(err)
        })
    }

    public deleteUser(req: Request, res: Response) {
        const query = {
            _id: req.params.userId
        };

        mongoDbService.findOneAndDelete(User, query)
        .then(() => {
            return res.send({
                message: 'User successfully deleted!'
            })
        })
        .catch(err => {
            return res.send(err)
        })
    }
}