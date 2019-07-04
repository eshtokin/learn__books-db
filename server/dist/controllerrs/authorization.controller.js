"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const user_controller_1 = require("../controllerrs/user.controller");
const crypt = require("bcryptjs");
class AuthorizationController {
    login(req, res) {
        user_controller_1.User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(500).send({
                    message: "Error on the server"
                });
            }
            if (!user) {
                return res.status(400).send({
                    message: "User not found"
                });
            }
            const passwordIsValid = crypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    authorization: false,
                    token: null
                });
            }
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                password: user.password,
                name: user.name,
                role: user.role
            }, "supersecretkey", {
                expireIn: 20
            });
        });
    }
}
exports.AuthorizationController = AuthorizationController;
//# sourceMappingURL=authorization.controller.js.map