import * as mongoose from "mongoose"
import { UserSchema } from "../models/user.model"
import { Request, Response } from "express"

export const User = mongoose.model('User', UserSchema);

export class UserController {

    public getAllUsers(req: Request, res: Response) {
        User.find({}, (err, users) => {
            if (err) {
                res.send(err)
            }
            res.json(users)
        })
    }
    
    public getUserById(req: Request, res: Response) {           
        User.findById(req.params.userId, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUser(req: Request, res: Response) {
        User.findByIdAndUpdate(req.params.userId, req.body, {new:true}, (err, user) => {
            if (err) {
                res.send(err)
            }
            res.json(user)
        })
    }

    public deleteUser(req: Request, res: Response) {
        User.findByIdAndRemove(req.params.userId, (err, user) => {
            if (err) {
                res.send(err)
            }
            res.json({message: 'User successfully deleted!'})
        })
    }
}