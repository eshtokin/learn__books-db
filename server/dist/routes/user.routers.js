"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllerrs/user.controller");
const authorization_controller_1 = require("../controllerrs/authorization.controller");
const user_model_1 = require("../models/user.model");
const auth_middleware_1 = require("../middleware/auth.middleware");
const registration_controller_1 = require("../controllerrs/registration.controller");
class Routes {
    constructor() {
        this.userController = new user_controller_1.UserController();
        this.authentController = new authorization_controller_1.AuthorizationController();
        this.registrationController = new registration_controller_1.RegistrationController();
    }
    routes(app) {
        app.route("/")
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request succsessfull!'
            });
        });
        app.route("/login")
            .post(this.authentController.login);
        app.route("/registration")
            .post(this.registrationController.registration);
        app.route("/user")
            .get(this.userController.getAllUsers);
        app.route("/user/:userId")
            .get(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.userController.getUserById)
            .put(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.userController.updateUser)
            // .delete(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.deleteUser)
            .delete(this.userController.deleteUser);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=user.routers.js.map