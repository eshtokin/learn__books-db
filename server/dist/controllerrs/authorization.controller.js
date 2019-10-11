"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("./../services/user.service");
const userService = new user_service_1.default();
class AuthorizationController {
    login(req, res) {
        userService.loginUser(req.body)
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err));
    }
    registration(req, res) {
        userService.registrateUser(req.body)
            .then(user => res.status(200).send({ message: 'registrated' }))
            .catch(err => res.status(500).send(err));
    }
}
exports.AuthorizationController = AuthorizationController;
//# sourceMappingURL=authorization.controller.js.map