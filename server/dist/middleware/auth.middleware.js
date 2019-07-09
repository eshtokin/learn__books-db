"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../enviroments/config");
exports.AuthMiddleware = (roles) => {
    return (req, res, next) => {
        let token = req.headers["authorization"];
        if (!token) {
            return res.status(401).send({
                authorization: false,
                message: "no token provided"
            });
        }
        jwt.verify(token, config_1.AuthConfig.privateKey, (err, decoded) => {
            if (err) {
                return res.json({
                    authorization: false,
                    message: "no token provided"
                });
            }
            req.user = decoded;
            let isRoleExist = roles.find(item => item == req.user.role);
            if (!isRoleExist) {
                return res.status(401).send({
                    authorization: false,
                    message: "Access denied"
                });
            }
            next();
        });
    };
};
//# sourceMappingURL=auth.middleware.js.map