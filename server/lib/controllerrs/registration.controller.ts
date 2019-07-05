import { Request, Response } from "express"
import {User} from "../controllerrs/user.controller"
import * as crypt from "bcryptjs"

export class RegistrationController {
    public registration(req: Request, res: Response) {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err) {
                return res.status(500).send({
                    message: "Error on the server"
                })
            }
            if (user) {
                return res.status(400).send({
                    message: `User with e-mail "${req.body.email}" already exist`
                })
            }
            User.create({
                email: req.body.email,
                password: crypt.hashSync(req.body.password),
                name: req.body.name,
                role: req.body.role
            }, (err, user) => {
                res.status(200).send({
                    message: `Registration success`
                })
            })
        })
    }
}