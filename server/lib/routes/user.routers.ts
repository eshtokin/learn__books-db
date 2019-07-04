import { Request, Response } from "express";
import { UserController } from "../controllerrs/user.controller"



export class Routes {
    public userController : UserController = new UserController();

    public routes(app) {
        app.route("/")
        .get ((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request succsessfull!'
            })
        })

        app.route("/user")
        .post(this.userController.addNewUser)
        .get(this.userController.getAllUsers)

        app.route("/user/:userId")
        .get(this.userController.getUserById)
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser)

        app.route("/login")
        .get((req: Request, res:Response) => {
            res.status(200).send({
                message: "Work"
            })
        })
    }
}
