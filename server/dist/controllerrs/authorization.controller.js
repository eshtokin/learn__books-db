"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const user_controller_1 = require("../controllerrs/user.controller");
const crypt = require("bcryptjs");
const config_1 = require("../enviroments/config");
const mongodb_service_1 = require("../service/mongodb.service");
const mongoDbService = new mongodb_service_1.MongoDbService();
class AuthorizationController {
    login(req, res) {
        const query = {
            email: req.body.email
        };
        mongoDbService.findOne(user_controller_1.User, query)
            .then(user => {
            if (!user) {
                return res.status(400).send({
                    message: "User not found"
                });
            }
            const passwordIsValid = crypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    authorization: false,
                    token: null,
                    reqPws: crypt.hashSync(req.body.password),
                    uPwd: user.password
                });
            }
            const token = jwt.sign({
                id: user._id,
                password: '',
                email: user.email,
                name: user.name,
                role: user.role
            }, config_1.AuthConfig.privateKey); // publicKey
            return res.status(200).send({
                authorization: true,
                token,
                user
            });
        })
            .catch(err => res.status(500).send({
            message: "Error on the server"
        }));
    }
    registration(req, res) {
        user_controller_1.User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(500).send({
                    message: "Error on the server"
                });
            }
            if (user) {
                return res.status(400).send({
                    message: `User with e-mail "${req.body.email}" already exist`
                });
            }
            user_controller_1.User.create({
                email: req.body.email,
                password: crypt.hashSync(req.body.password),
                name: req.body.name,
                books: [],
                role: req.body.role || 2,
                image: 'https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png'
            }, (err, user) => {
                res.status(200).send({
                    message: `Registration success`
                });
            });
        });
    }
}
exports.AuthorizationController = AuthorizationController;
//# sourceMappingURL=authorization.controller.js.map