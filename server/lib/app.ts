import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./common/routes/user.routers"
import * as mongoose from "mongoose"
import * as cors from "cors"
import { dbInfo } from './enviroments/config'
import { handleError } from "./common/helpers/errorHandler";

class App {
    public app: express.Application;
    public route: Routes = new Routes();

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
        
        this.app.use((err, req, res, next) => {
            handleError(err, res);
        });
    }

    private config(): void{
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
    }

    private mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(dbInfo.localMongoUrl, {useFindAndModify: false});
    }
}

export default new App().app;