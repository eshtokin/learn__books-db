"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// FORMAT
// Authorization: Bearer <access_token>
exports.verifyToken = (req, res, next) => {
    // Get value from header
    const bearerHeader = req.header['authorization'];
    if (typeof bearerHeader !== undefined) {
    }
    res.sendStatus(403);
};
//# sourceMappingURL=authentification.midleware.js.map