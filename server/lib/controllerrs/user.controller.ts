import { Request, Response } from "express"
import UserService from "./../services/user.service"
const userService =  new UserService();

export class UserController {
    public getAllUsers(req: Request, res: Response) {
        userService.getAllUsers(req)
        .then(result => {
            return res.status(200).send(result)
        })
        .catch(err => {
            return res.send(err)
        })
    }
    
    public getSomeUser(req: Request, res: Response) {
        userService.getSomeUser(req)
        .then(result => {
            return res.status(200).send(result)
        })
        .catch(err => {
            return res.send(err)
        })
    }

    public getUserById(req: Request, res: Response) {
        userService.getUserById(req)
        .then(value => {
            return res.json(value);
        })
        .catch(err => {
            return res.send(err);
        })
    }

    public getFavoriteBookFromUser(req: Request, res: Response) {
        userService.getFavoriteBookFromUser(req)
        .then( result => {            
            return res.json(result[0].books)
        })
        .catch(err => {
            return res.send(err);
        })
    }

    public updateUser(req: Request, res: Response) {
       userService.updateUser(req)
        .then(value => {
            return res.json(value)
        })
        .catch(err => {
            return res.send(err)
        })
    }

    public deleteUser(req: Request, res: Response) {
        userService.deleteUser(req)
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
        userService.addBookToProfile(req)
        .then(() => {
            return res.status(200).send({
                message: 'added to profile'
            })
        })
        .catch(err => {
            return res.status(500).send({
                message: 'server error'
            })
        })
    }
}