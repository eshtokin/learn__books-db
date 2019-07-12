import { Request, Response, NextFunction } from 'express';
import { UserController } from "../controllerrs/user.controller"
import { AuthorizationController } from "../controllerrs/authorization.controller"
import { UserRoles } from "../models/user.model";
import { AuthMiddleware } from '../middleware/auth.middleware';
import { RegistrationController } from "../controllerrs/registration.controller"

export class Routes {
    public userController : UserController = new UserController();
    public authentController : AuthorizationController = new AuthorizationController();
    public registrationController : RegistrationController = new RegistrationController();

    public routes(app) {
        app.route("/")
        .get ((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request succsessfull!'
            })
        })

        app.route("/login")
        .post(this.authentController.login)

        app.route("/registration")
        .post(this.registrationController.registration)

        app.route("/user")
        .get(this.userController.getAllUsers)
        
        app.route("/user/:userId")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.getUserById)
        // .put(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.updateUser)
        .put(this.userController.updateUser)
        // .delete(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.deleteUser)
        .delete(this.userController.deleteUser)

    }
}
