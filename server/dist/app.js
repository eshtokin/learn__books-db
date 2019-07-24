"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const user_routers_1 = require("./routes/user.routers");
const mongoose = require("mongoose");
const cors = require("cors");
class App {
    constructor() {
        this.route = new user_routers_1.Routes();
        // change "<password>"
        this.password = "BestOppai24!";
        this.collection = "book-db";
        this.mongoUrl = `mongodb+srv://Eshtokin:${this.password}@book-db-lmley.mongodb.net/${this.collection}?retryWrites=true&w=majority`;
        this.localMongoUrl = "mongodb://localhost/CRMdb";
        this.app = express();
        this.app.use(cors());
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.localMongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map