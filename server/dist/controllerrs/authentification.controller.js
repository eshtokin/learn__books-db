"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class AuthentificationController {
    login(req, res) {
        jwt.sign({ email: "OnePunchMan@gmail.com", password: "Oppai" }, "supersecretkey", (err, token) => {
            res.json({ token });
        });
    }
}
exports.AuthentificationController = AuthentificationController;
//# sourceMappingURL=authentification.controller.js.map