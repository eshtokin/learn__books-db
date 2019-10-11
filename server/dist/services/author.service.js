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
const author_repository_1 = require("./../repositories/author.repository");
const author_model_1 = require("./../entities/author.model");
exports.authorRepository = new author_repository_1.default(author_model_1.Authors);
class AuthorService {
    getAllAuthor() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.authorRepository.find({});
        });
    }
    // public async getAuthor(req): Promise<AuthorAndCategory> {
    //   const query = req.params.authorId;
    //   return await authorRepository.findById(query);
    // }
    addAuthor(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const isAuthExist = yield this.isAuthorExist(name);
            if (isAuthExist) {
                const data = { name };
                return yield exports.authorRepository.create(data);
            }
        });
    }
    isAuthorExist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.authorRepository.findOne({ name });
            return result === null
                ? false
                : true;
        });
    }
}
exports.default = AuthorService;
//# sourceMappingURL=author.service.js.map