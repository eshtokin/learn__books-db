import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/user.routers"
import * as mongoose from "mongoose"
import * as cors from "cors"
import { dbInfo } from './enviroments/config'

class App {

    public app: express.Application;
    public route: Routes = new Routes();

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json({limit: '50mb'}));
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
    }

    private mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(dbInfo.localMongoUrl);
    }

}

export default new App().app;