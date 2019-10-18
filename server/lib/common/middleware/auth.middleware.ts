import * as jwt from "jsonwebtoken"
import { UserRoles } from "../../entities/user.model";
import { NextFunction } from "connect";
import { keys } from "../../keys/config";
import BadRequest from "./../../common/exceptions/bad-request.exception";
import UnauthorizedException from "./../../common/exceptions/unauthorized.exception";

export const AuthMiddleware = (roles: UserRoles[]) => {
    return (req, res, next: NextFunction) => {
        let token = req.headers["authorization"];
        
        if (!token) {
            throw new BadRequest('Please enter with your account. No token provided')
        }

        jwt.verify(token, keys.privateKey, (err, decoded) => {
            if (err) {
                throw new BadRequest('Please enter with your account. Incorrect token')
            }

            req.user = decoded;

            let isRoleExist = roles.find(item => item == req.user.role);

            if (!isRoleExist) {
                throw new UnauthorizedException("Forbidden. Please enter with your account.")
            }

            next();
        })
    }
}