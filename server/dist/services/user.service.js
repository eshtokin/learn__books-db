"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("./../repositories/user.repository");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const crypt = require("bcryptjs");
const config_1 = require("./../enviroments/config");
const user_model_1 = require("./../entities/user.model");
const errorHandler_1 = require("./../common/helpers/errorHandler");
exports.userRepository = new user_repository_1.default(user_model_1.UserModel);
class UserService {
    makeAgreagationQueryForUser() {
        return {
            $lookup: {
                from: "books",
                localField: "books",
                foreignField: "_id",
                as: "book_list"
            }
        };
    }
    makePaginationQueryForUser(paginationString) {
        const pagination = JSON.parse(paginationString);
        const skip = {
            $skip: (pagination.pageIndex) * (pagination.pageSize)
        };
        const limit = {
            $limit: (pagination.pageSize)
        };
        let query = {
            $facet: {
                listOfItem: [
                    skip,
                    limit
                ],
                totalCount: [
                    {
                        $count: 'count'
                    }
                ]
            }
        };
        return query;
    }
    getAllUsers(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(JSON.parse(pagination));
            const agreagationQuery = [
                this.makeAgreagationQueryForUser(),
                this.makePaginationQueryForUser(pagination),
            ];
            return yield exports.userRepository.aggreagate(agreagationQuery);
        });
    }
    getUserByFilter(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const agreagationQuery = [
                {
                    $match: {
                        email: {
                            $regex: `.*${query.searchString ? query.searchString : ' '}*`,
                            $options: 'i'
                        }
                    }
                },
                this.makeAgreagationQueryForUser(),
                this.makePaginationQueryForUser(query.pagination),
            ];
            return yield exports.userRepository.aggreagate(agreagationQuery);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                _id: userId
            };
            const user = yield exports.userRepository.findById(query);
            user.password = '';
            return user;
        });
    }
    getFavoriteBookFromUser(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfoFromToken = jwt.decode(authorization);
            const query = {
                _id: userInfoFromToken.id
            };
            let user = yield exports.userRepository.findOne(query);
            return user.books;
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.password === '') {
                delete user.password;
            }
            else if (user.password[0] !== '$') {
                user.password = crypt.hashSync(user.password);
            }
            if (user.books) {
                user.books = user.books.map(book => {
                    return mongoose.Types.ObjectId(book);
                });
            }
            const query = {
                _id: user._id
            };
            return yield exports.userRepository.findOneAndUpdate(query, user);
        });
    }
    deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                _id: req.params.userId
            };
            return yield exports.userRepository.findOneAndDelete(query);
        });
    }
    addBookToProfile(authorization, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = jwt.decode(authorization);
            const query = {
                _id: mongoose.Types.ObjectId(user.id)
            };
            const data = {
                $addToSet: { books: mongoose.Types.ObjectId(bookId) }
            };
            return yield exports.userRepository.findOneAndUpdate(query, data);
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                email
            };
            return yield exports.userRepository.findOne(query);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                email: user.email,
                password: crypt.hashSync(user.password),
                name: user.name,
                books: [],
                role: user.role || user_model_1.UserRoles.user,
                image: 'https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png'
            };
            return yield exports.userRepository.create(newUser);
        });
    }
    loginUser(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOneByEmail(loginData.email);
            if (!user) {
                throw new errorHandler_1.ErrorHandler(418, 'User not found');
            }
            const passwordIsValid = crypt.compareSync(loginData.password, user.password);
            if (!passwordIsValid) {
                throw new errorHandler_1.ErrorHandler(100, 'Authorization failed');
            }
            const token = jwt.sign({
                id: user._id,
                password: '',
                email: user.email,
                name: user.name,
                role: user.role
            }, config_1.AuthConfig.privateKey); // publicKey
            return {
                authorization: true,
                token,
            };
        });
    }
    registrateUser(userFromQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOneByEmail(userFromQuery.email);
            if (!user) {
                this.createUser(userFromQuery);
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map