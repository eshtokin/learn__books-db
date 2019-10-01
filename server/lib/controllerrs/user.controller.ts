import * as mongoose from "mongoose"
import { UserSchema } from "../models/user.model"
import { Request, Response } from "express"
import { MongoDbService } from "../service/mongodb.service";
import * as crypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

export const User = mongoose.model('User', UserSchema);

const mongoDbService = new MongoDbService();

export class UserController {

    public getAllUsers(req: Request, res: Response) {
        const skip = {
            $skip: (+req.query.pageIndex) * (+req.query.pageSize)
        };
        const limit = {
            $limit: (+req.query.pageSize)
        }
        let query = {
            $facet: {
              listOfItem: [
                skip, 
                limit
              ],
              totalCount: [
                {
                  $count: 'count'
                }]
            }
        };

        const agreagationQuery: object[] = [
            {
                $lookup: {
                    from: "books",
                    localField: "books",
                    foreignField: "_id",
                    as: "book_list"
                }
            },
            {...query}
        ];

        mongoDbService.Aggreagate(User, agreagationQuery)
        .then(result => {
            return res.send(result)
        })
        .catch(err => {
            return res.send(err)
        })
    }
    
    public getSomeUser(req: Request, res: Response) {
        const pagination = JSON.parse(req.query.pagination);
        
        const skip = {
            $skip: (pagination.pageIndex) * (pagination.pageSize)
        };
        const limit = {
            $limit: (pagination.pageSize)
        }
        let query = {
            $facet: {
              listOfItem: [
                skip, 
                limit
              ],
              totalCount: [
                {
                  $count: 'count'
                }]
            }
        };

        const agreagationQuery: object[]= [
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
            },
            {...query}
        ];

        mongoDbService.Aggreagate(User, agreagationQuery)
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

    public getFavoriteBookFromUser(req: Request, res: Response) {
        const user = jwt.decode(req.headers.authorization);
        
        const query = {
            _id: user.id
        };
        
        mongoDbService.find(User, query)
        .then( result => {            
            return res.json(result[0].books)
        })
        .catch(err => {
            return res.send(err);
        })
    }

    public updateUser(req: Request, res: Response) {
        const data = req.body;

        if (req.body.password === '' ) {
            delete data.password
        } else if (req.body.password[0] !== '$') {
            data.password = crypt.hashSync(req.body.password)
        }

        if (req.body.books) {
            data.books = req.body.books.map(book => {
                return mongoose.Types.ObjectId(book)
            })
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

    public addBookToProfile(req: Request, res: Response) {
        const user = jwt.decode(req.headers.authorization);
        
        const query = {
            _id: mongoose.Types.ObjectId(user.id)
          };
          const data = {
            $addToSet: { books: mongoose.Types.ObjectId(req.params.bookId)}
        };

        mongoDbService.findOneAndUpdate(User, query, data)
        .then(() => {
            return res.send({
                message: 'add in profile'
            })
        })
        .catch(err => {
            return res.send
        })
    }
}