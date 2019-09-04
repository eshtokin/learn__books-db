"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongoDbService {
    create(collection, data) {
        return collection.create(data, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    insertMany(collection, data) {
        return collection.insertMany(data, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    find(collection, query) {
        return collection.find(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    findById(collection, query) {
        return collection.findById(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    findOne(collection, query) {
        return collection.findOne(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    findOneAndDelete(collection, query) {
        return collection.findOneAndDelete(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    findOneAndUpdate(collection, query, data) {
        return collection.findOneAndUpdate(query, data, { new: true }, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    Aggreagate(collection, query) {
        return collection.aggregate(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
}
exports.MongoDbService = MongoDbService;
//# sourceMappingURL=mongodb.service.js.map