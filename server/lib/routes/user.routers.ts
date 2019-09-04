import { Request, Response, NextFunction } from 'express';
import { UserController } from "../controllerrs/user.controller"
import { AuthorizationController } from "../controllerrs/authorization.controller"
import { UserRoles } from "../models/user.model";
import { AuthMiddleware } from '../middleware/auth.middleware';
import { BookController } from '../controllerrs/book.controller';
import { CategoryController } from '../controllerrs/category.controller';
import { AuthorController } from '../controllerrs/author.controller';

export class Routes {
    public userController : UserController = new UserController();
    public authentController : AuthorizationController = new AuthorizationController();
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
        .post(this.authentController.registration)

        app.route("/user")
        .get(this.userController.getAllUsers)

        app.route("/usersearch")
        .get(this.userController.getSomeUser)

        app.route("/userfavorites")
        .get(this.userController.getFavoriteBookFromUser)

        app.route("/user/:userId")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.getUserById)
        .put(this.userController.updateUser) // AuthMiddleware([UserRoles.admin, UserRoles.user]),
        .delete(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.deleteUser)

        app.route("/userbooks")
        .get(this.bookController.getUserBooks)

        app.route("/books")
        .get(this.bookController.getAllBook)
        .post(this.bookController.addBook)
        .put(this.bookController.updateBook)
        .delete(this.bookController.deleteBook)

        app.route("/somebooks")
        .get(this.bookController.getSomeBooks)

        app.route("/getbookbyindustryIdentifiers")
        .get(this.bookController.getBookByIndustryIdentifiers)

        app.route("/books/:bookId")
        .get(this.bookController.getBook)

        app.route("/category")
        .get(this.categoryController.getAllCategory)
        .post(this.categoryController.addCategory)
        .delete(this.categoryController.deleteCategory)

        app.route("/author")
        .get(this.authorController.getAllAuthor)
        .post(this.authorController.addAuthor)
        .delete(this.authorController.deleteAuthor)

        app.route("/author/:authorId")
        .get(this.authorController.getAuthor)
    }
}
