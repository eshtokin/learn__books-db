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
const mongo_repository_1 = require("./base/mongo.repository");
class UserRepository extends mongo_repository_1.MongoRepository {
    aggreagate(query) {
        return this.collection.aggregate(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.create(data, (err, result) => {
                if (err)
                    return err;
                return result;
            });
        });
    }
    findById(query) {
        return this.collection.findById(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    findOneAndUpdate(query, data) {
        return this.collection.findOneAndUpdate(query, data, { new: true }, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    findOneAndDelete(query) {
        return this.collection.findOneAndDelete(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
}
exports.default = UserRepository;
;
//# sourceMappingURL=user.repository.js.map