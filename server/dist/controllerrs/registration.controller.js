"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllerrs/user.controller");
const crypt = require("bcryptjs");
class RegistrationController {
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
                role: req.body.role
            }, (err, user) => {
                res.status(200).send({
                    message: `Registration success`
                });
            });
        });
    }
}
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.controller.js.map