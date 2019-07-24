import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/user.routers"
import * as mongoose from "mongoose"
import * as cors from "cors"

class App {

    public app: express.Application;
    public route: Routes = new Routes();

    // change "<password>"
    private password = "BestOppai24!";
    private collection = "book-db"
    public mongoUrl: String = `mongodb+srv://Eshtokin:${this.password}@book-db-lmley.mongodb.net/${this.collection}?retryWrites=true&w=majority`;
    public localMongoUrl : String = "mongodb://localhost/CRMdb";

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.localMongoUrl);
    }

}

export default new App().app;