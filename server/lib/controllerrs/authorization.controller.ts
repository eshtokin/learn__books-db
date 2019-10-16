import { Response, NextFunction } from "express"
import UserService from "./../services/user.service"
import AuthorizationRequest from "models/request/user-controller/authorization.model";

const userService = new UserService();

export class AuthorizationController {
    public login(req: AuthorizationRequest, res: Response, next: NextFunction) {
        userService.loginUser(req.body)
        .then(data => res.send(data))
        .catch(next)
    }

    public registration(req: AuthorizationRequest, res: Response, next: NextFunction) {
        userService.registrateUser(req.body)
        .then(user => res.status(200).send({message: 'registrated'}))
        .catch(next)
    }
}