import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import {User} from "../controllerrs/user.controller"
import * as crypt from "bcryptjs"
import { AuthConfig } from "../enviroments/config"
import { MongoDbService } from "../service/mongodb.service";

const mongoDbService = new MongoDbService();

export class AuthorizationController {
    public login(req: Request, res: Response) {
        const query = {
            email: req.body.email
        };
        mongoDbService.findOne(User, query)
        .then(user => {
            if (!user) {
                return res.status(400).send({
                    message: "User not found"
                })
            }

            const passwordIsValid = crypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    authorization: false,
                    token: null,
                    reqPws: crypt.hashSync(req.body.password),
                    uPwd: user.password
                })
            }
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                password: user.password,
                name: user.name,
                role: user.role
            }, AuthConfig.privateKey);

            return res.status(200).send({
                authorization: true,
                token,
                user
            })
        })
        .catch(err => res.status(500).send({
            message: "Error on the server"
        }))
    }

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
                image: '',
                books: [],
                role: req.body.role || 2
            }, (err, user) => {
                res.status(200).send({
                    message: `Registration success`
                })
            })
        })
    }
}