"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../../controllerrs/user.controller");
const authorization_controller_1 = require("../../controllerrs/authorization.controller");
const user_model_1 = require("../../entities/user.model");
const auth_middleware_1 = require("../middleware/auth.middleware");
const book_controller_1 = require("../../controllerrs/book.controller");
const category_controller_1 = require("../../controllerrs/category.controller");
const author_controller_1 = require("../../controllerrs/author.controller");
class Routes {
    constructor() {
        this.userController = new user_controller_1.UserController();
        this.authentController = new authorization_controller_1.AuthorizationController();
        this.bookController = new book_controller_1.BookController();
        this.categoryController = new category_controller_1.CategoryController;
        this.authorController = new author_controller_1.AuthorController;
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
            .post(this.authentController.registration);
        app.route("/user")
            .get(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.userController.getAllUsers);
        app.route("/usersearch")
            .get(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.userController.getUserByFilter);
        app.route("/userfavorites")
            .get(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.userController.getFavoriteBookFromUser);
        app.route("/user/:userId")
            .get(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.userController.getUserById)
            .put(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.userController.updateUser)
            .delete(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.userController.deleteUser);
        app.route("/userbooks")
            .get(this.bookController.getUserBooks);
        app.route("/books")
            .get(this.bookController.getAllBook)
            .post(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.bookController.addBook)
            .put(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.bookController.updateBook)
            .delete(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.bookController.deleteBook);
        app.route("/somebooks")
            .get(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.bookController.getBooksByFitler);
        app.route("/getbookbyindustryIdentifiers")
            .get(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.bookController.getBookByIndustryIdentifiers);
        app.route("/books/:bookId")
            // .get(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.bookController.getBook)
            .post(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.userController.addBookToProfile);
        app.route("/category")
            .get(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.categoryController.getAllCategory);
        // .post(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.categoryController.addCategory)
        // .delete(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.categoryController.deleteCategory)
        app.route("/author")
            .get(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.authorController.getAllAuthor)
            .post(auth_middleware_1.AuthMiddleware([user_model_1.UserRoles.admin, user_model_1.UserRoles.user]), this.authorController.addAuthor);
        // .delete(AuthMiddleware([UserRoles.admin, UserRoles.user]), this.authorController.deleteAuthor)
    }
}
exports.Routes = Routes;
//# sourceMappingURL=user.routers.js.map