"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.userInfo = {
    nickname: 'Eshtokin',
    password: "BestOppai24!",
    collection: "book-db"
};
exports.dbInfo = {
    mongoUrl: `mongodb+srv://${exports.userInfo.nickname}:${exports.userInfo.password}@${exports.userInfo.collection}-lmley.mongodb.net/${exports.userInfo.collection}?retryWrites=true&w=majority`,
    localMongoUrl: "mongodb://localhost/CRMdb"
};
exports.AuthConfig = {
    privateKey: fs.readFileSync("./lib/private.key", "utf-8"),
    publicKey: fs.readFileSync("./lib/public.key", "utf-8")
};
//# sourceMappingURL=config.js.map