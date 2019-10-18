import { Response, NextFunction } from "express"
import UserService from "./../services/user.service"
import GetAllUsersRequest from "./../models/request/user-controller/get-all-users.model";
import GetUserByFilterRequest from "./../models/request/user-controller/get-user-by-filter.model";
import DeleteUserRequest from "./../models/request/user-controller/delete-user.model";
import AddBookToProfileRequest from "./../models/request/user-controller/add-book-to-profile.model";
import UpdateUserRequest from "models/request/user-controller/update-user.model";
import GetFavoritesBookFromUserRequest from "./../models/request/user-controller/get-favorites-book-from-user.model";

const userService =  new UserService();

export class UserController {
    public getAllUsers(req: GetAllUsersRequest, res: Response, next: NextFunction): void {
        userService.getAllUsers(req.query.pagination)
        .then(result => res.status(200).send(result))
        .catch(next)
    }
    
    public getUserByFilter(req: GetUserByFilterRequest, res: Response, next: NextFunction): void {
        userService.getUserByFilter(req.query)
        .then(result => res.status(200).send(result))
        .catch(next)
    }

    public getUserById(req: {params: {userId: string}}, res: Response, next: NextFunction): void {
        userService.getUserById(req.params.userId)
        .then(value => res.json(value))
        .catch(next)
    }
    
    public getFavoriteBookFromUser(req: GetFavoritesBookFromUserRequest , res: Response, next: NextFunction): void {
        userService.getFavoriteBookFromUser(req.headers.authorization)
        .then( result => res.status(200).send(result))
        .catch(next)
    }

    public updateUser(req: UpdateUserRequest, res: Response, next: NextFunction): void {
       userService.updateUser(req.body)
        .then(value => res.json(value))
        .catch(next)
    }

    public deleteUser(req: DeleteUserRequest, res: Response, next: NextFunction): void {
        userService.deleteUser(req)
        .then(() => res.send({
            message: 'User successfully deleted!'
        }))
        .catch(next)
    }

    public addBookToProfile(req: AddBookToProfileRequest, res: Response, next: NextFunction): void{
        userService.addBookToProfile(req.headers.authorization, req.params.bookId)
        .then(() => res.status(200).send({
            message: 'added to profile'
        }))
        .catch(next)
    }
}