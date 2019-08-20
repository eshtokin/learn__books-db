import * as mongoose from "mongoose"
import { UserSchema } from "../models/user.model"
import { Request, Response } from "express"
import { MongoDbService } from "../service/mongodb.service";

export const User = mongoose.model('User', UserSchema);

const mongoDbService = new MongoDbService();

export class UserController {

    public getAllUsers(req: Request, res: Response) {
        const query = [{
            $lookup: {
                from: "books",
                localField: "books",
                foreignField: "_id",
                as: "book_list"
            }
        }];

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
            return res.json(value);
        })
        .catch(err => {
            return res.send(err);
        })
    }

    public updateUser(req: Request, res: Response) {        
        let data = req.body;
        console.log('data: ', data);
        
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