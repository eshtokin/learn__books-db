import { Request, Response } from "express"
import UserService from "./../services/user.service"
import GetAllUsersRequest from "models/request/user-controller/get-all-users.model";
import GetUserByFilterRequest from "models/request/user-controller/get-user-by-filter.model";
import GetFavoritesBookFromUserRequest from "models/request/user-controller/get-favorites-book-from-user.model";
import DeleteUserRequest from "models/request/user-controller/delete-user.model";
import AddBookToProfileRequest from "models/request/user-controller/add-book-to-profile.model";
import UpdateUserRequest from "models/request/user-controller/update-user.model";

const userService =  new UserService();

export class UserController {
    public getAllUsers(req: GetAllUsersRequest, res: Response): void {
        userService.getAllUsers(req.query.pagination)
        .then(result => res.status(200).send(result))
        .catch(err => res.send(err))
    }
    
    public getUserByFilter(req: GetUserByFilterRequest, res: Response): void {
        userService.getUserByFilter(req.query.params)
        .then(result => res.status(200).send(result))
        .catch(err => res.send(err))
    }

    public getUserById(req: {params: {userId: string}}, res: Response): void {
        userService.getUserById(req.params)
        .then(value => res.json(value))
        .catch(err => res.send(err))
    }

    public getFavoriteBookFromUser(req: GetFavoritesBookFromUserRequest, res: Response): void {
        userService.getFavoriteBookFromUser(req.headers.authorization)
        .then( result => res.status(200).send(result))
        .catch(err => res.send(err))
    }

    public updateUser(req: UpdateUserRequest, res: Response): void {
       userService.updateUser(req.body)
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
        userService.addBookToProfile(req.headers.authorization, req.params.bookId)
        .then(() => res.status(200).send({
            message: 'added to profile'
        }))
        .catch(err => res.status(500).send(err))
    }
}