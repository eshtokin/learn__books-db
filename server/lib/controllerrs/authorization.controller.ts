import { Response } from "express"
import UserService from "./../services/user.service"
import AuthorizationRequest from "models/request/user-controller/authorization.model";

const userService = new UserService();

export class AuthorizationController {
    public login(req: AuthorizationRequest, res: Response) {
        userService.loginUser(req.body)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
    }

    public registration(req: AuthorizationRequest, res: Response) {
        userService.registrateUser(req.body)
        .then(user => res.status(200).send({message: 'registrated'}))
        .catch(err => res.status(500).send(err))
    }
}