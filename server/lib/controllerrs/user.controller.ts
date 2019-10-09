import { Request, Response } from "express"
import UserService from "./../services/user.service"
import GetAllUsersRequest from "models/request/user-controller/get-all-users.model";
import GetSomeUserRequest from "models/request/user-controller/get-some-user.model";
import GetFavoritesBookFromUserRequest from "models/request/user-controller/get-favorites-book-from-user.model";
import DeleteUserRequest from "models/request/user-controller/delete-user.model";
import AddBookToProfileRequest from "models/request/user-controller/add-book-to-profile.model";

const userService =  new UserService();

export class UserController {
    public getAllUsers(req: GetAllUsersRequest, res: Response): void {
        userService.getAllUsers(req)
        .then(result => res.status(200).send(result))
        .catch(err => res.send(err))
    }
    
    public getSomeUser(req: GetSomeUserRequest, res: Response): void {
        userService.getSomeUser(req)
        .then(result => res.status(200).send(result))
        .catch(err => res.send(err))
    }

    // public getUserById(req: Request, res: Response): void {
    //     userService.getUserById(req)
    //     .then(value => res.json(value))
    //     .catch(err => res.send(err))
    // }

    public getFavoriteBookFromUser(req: Request, res: Response): void {
        userService.getFavoriteBookFromUser(req)
        .then( result => res.status(200).send(result))
        .catch(err => res.send(err))
    }

    public updateUser(req: GetFavoritesBookFromUserRequest, res: Response): void {
       userService.updateUser(req)
        .then(value => res.json(value))
        .catch(err => res.send(err))
    }

    public deleteUser(req: DeleteUserRequest, res: Response): void {
        userService.deleteUser(req)
        .then(() => res.send({
            message: 'User successfully deleted!'
        }))
        .catch(err => res.send(err))
    }

    public addBookToProfile(req: AddBookToProfileRequest, res: Response): void{
        userService.addBookToProfile(req)
        .then(() => res.status(200).send({
            message: 'added to profile'
        }))
        .catch(err => res.status(500).send(err))
    }
}