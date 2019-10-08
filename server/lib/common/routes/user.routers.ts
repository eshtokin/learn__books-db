import { Request, Response } from 'express';
import { UserController } from "../../controllerrs/user.controller"
import { AuthorizationController } from "../../controllerrs/authorization.controller"
import { UserRoles } from "../../entities/user.model";
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { BookController } from '../../controllerrs/book.controller';
import { CategoryController } from '../../controllerrs/category.controller';
import { AuthorController } from '../../controllerrs/author.controller';

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
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.getAllUsers)

        app.route("/usersearch")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.getSomeUser)

        app.route("/userfavorites")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.getFavoriteBookFromUser)

        app.route("/user/:userId")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.getUserById)
        .put(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.updateUser)
        .delete(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.deleteUser)

        app.route("/userbooks")
        .get(this.bookController.getUserBooks)

        app.route("/books")
        .get(this.bookController.getAllBook)
        .post(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.bookController.addBook)
        .put(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.bookController.updateBook)
        .delete(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.bookController.deleteBook)

        app.route("/somebooks")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.bookController.getSomeBooks)

        app.route("/getbookbyindustryIdentifiers")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.bookController.getBookByIndustryIdentifiers)

        app.route("/books/:bookId")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.bookController.getBook)
        .post(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.userController.addBookToProfile)

        app.route("/category")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.categoryController.getAllCategory)
        .post(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.categoryController.addCategory)
        // .delete(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.categoryController.deleteCategory)

        app.route("/author")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.authorController.getAllAuthor)
        .post(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.authorController.addAuthor)
        // .delete(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.authorController.deleteAuthor)

        app.route("/author/:authorId")
        .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.authorController.getAuthor)
    }
}
