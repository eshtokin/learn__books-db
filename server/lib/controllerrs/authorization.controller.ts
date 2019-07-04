import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import {User} from "../controllerrs/user.controller"
import * as crypt from "bcryptjs"

export class AuthorizationController {
    public login(req: Request, res: Response) {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err) {
                return res.status(500).send({
                    message: "Error on the server"
                })
            }
            if (!user) {
                return res.status(400).send({
                    message: "User not found"
                })
            }

            const passwordIsValid = crypt.compareSync(req.body.password, crypt.hashSync(user.password));
            if (!passwordIsValid) {
                return res.status(401).send({
                    authorization: false,
                    token: null,
                })
            }
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                password: user.password,
                name: user.name,
                role: user.role
            }, "supersecretkey");

            res.status(200).send({
                authorization: true,
                token,
                user,
                // hashPassword: crypt.hashSync(user.password)
            })
        })
    }
}