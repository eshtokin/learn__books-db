"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request succsessfull!'
            });
        });
        app.routes('/user')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET user!'
            });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=userRouters.js.map