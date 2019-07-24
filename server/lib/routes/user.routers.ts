import { Request, Response, NextFunction } from 'express';
import { UserController } from "../controllerrs/user.controller"
import { AuthorizationController } from "../controllerrs/authorization.controller"
import { UserRoles } from "../models/user.model";
import { AuthMiddleware } from '../middleware/auth.middleware';
import { RegistrationController } from "../controllerrs/registration.controller"
import { BookController } from '../controllerrs/book.controller';
import { CategoryController } from '../controllerrs/category.controller';
import { AuthorController } from '../controllerrs/author.controller';
import { request } from 'https';

export class Routes {
    public userController : UserController = new UserController();
    public authentController : AuthorizationController = new AuthorizationController();
    public registrationController : RegistrationController = new RegistrationController();
    public bookController: BookController = new BookController();
    public categoryController: CategoryController = new CategoryController;
    public authorController: AuthorController = new AuthorController;

    public routes(app) {
        app.route("/")
        .get((req: Request, res: Response) => {
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
        .put(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.updateUser)
        .delete(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.deleteUser)

        app.route("/books")
        .get(this.bookController.getAllBook)
        .post(this.bookController.addBook)
        .delete(this.bookController.deleteBook)

        app.route("/category")
        .get(this.categoryController.getAllCategory)
        .post(this.categoryController.addCategory)
        .delete(this.categoryController.deleteCategory)

        app.route("/author")
        .get(this.authorController.getAllAuthor)
        .post(this.authorController.addAuthor)
        .delete(this.authorController.deleteAuthor)
    }
}
