"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const user_routers_1 = require("./routes/user.routers");
const mongoose = require("mongoose");
class App {
    constructor() {
        this.route = new user_routers_1.Routes();
        this.mongoUrl = "mongodb://localhost/CRMdb";
        this.app = express();
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
        mongoose.connect(this.mongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map