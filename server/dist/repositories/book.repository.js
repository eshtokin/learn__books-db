"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_repository_1 = require("./base/mongo.repository");
class BookRepository extends mongo_repository_1.MongoRepository {
    aggreagate(query) {
        return this.collection.aggregate(query, (err, result) => {
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
    findById(query) {
        return this.collection.findById(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    findOne(query) {
        return this.collection.findOne(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    find(query) {
        return this.collection.find(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    create(data) {
        return this.collection.create(data, (err, result) => {
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
}
exports.default = BookRepository;
;
//# sourceMappingURL=book.repository.js.map