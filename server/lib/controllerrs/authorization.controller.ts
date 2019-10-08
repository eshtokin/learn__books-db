import { Request, Response } from "express"
import UserService from "./../services/user.service"

const userService = new UserService();

export class AuthorizationController {
    public login(req: Request, res: Response) {
        userService.loginUser(req)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
    }

    public registration(req: Request, res: Response) {
        userService.registrateUser(req)
        .then(user => res.status(200).send({message: 'registrated'}))
        .catch(err => res.status(500).send(err))
    }
}