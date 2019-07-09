"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
// const paramConfig = {
//     issuer: "Igor Rosliakov",
//     subject: 'igor@sozdayka.com',
//     audience: 'http://sozdayka.com',
// }
exports.AuthConfig = {
    privateKey: fs.readFileSync("./lib/private.key", "utf-8"),
};
//# sourceMappingURL=config.js.map