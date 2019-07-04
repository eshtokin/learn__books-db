"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllerrs/user.controller");
const authorization_controller_1 = require("../controllerrs/authorization.controller");
const user_model_1 = require("../models/user.model");
const auth_middleware_1 = require("../middleware/auth.middleware");
class Routes {
    constructor() {
        this.userController = new user_controller_1.UserController();
        this.authentController = new authorization_controller_1.AuthorizationController();
    }
    routes(app) {
        app.route("/")
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request succsessfull!'
            });
        });
        app.route("/user")
            .post(this.userController.addNewUser)
            .get(this.userController.getAllUsers);
        app.route("/user/:userId")
            .get(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.userController.getUserById)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);
        app.route("/login")
            .get(this.authentController.login);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=user.routers.js.map