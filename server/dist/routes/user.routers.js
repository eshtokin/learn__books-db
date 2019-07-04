"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllerrs/user.controller");
class Routes {
    constructor() {
        this.userController = new user_controller_1.UserController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request succsessfull!'
            });
        });
        app.route("/user")
            .post(this.userController.addNewUser)
            .get(this.userController.getAllUsers);
        app.route("user/:usertId")
            .get(this.userController.getUserById)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=user.routers.js.map