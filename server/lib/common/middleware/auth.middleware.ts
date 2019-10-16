import * as jwt from "jsonwebtoken"
import { UserRoles } from "../../entities/user.model";
import { NextFunction } from "connect";
import { keys } from "../../keys/config";
import NotAuthorizedException from "./../../common/exceptions/not-authorized.exception";

export const AuthMiddleware = (roles: UserRoles[]) => {
    return (req, res, next: NextFunction) => {
        let token = req.headers["authorization"];
        
        if (!token) {
           throw new NotAuthorizedException();
        }

        jwt.verify(token, keys.privateKey, (err, decoded) => {
            if (err) {
                return res.json({
                    authorization: false,
                    message: "no token provided"
                })
            }

            req.user = decoded;

            let isRoleExist = roles.find(item => item == req.user.role);

            if (!isRoleExist) {
                return res.status(401).send({
                    authorization: false,
                    message: "Access denied"
                })
            }

            next();
        })
    }
}