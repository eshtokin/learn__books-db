"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongoRepository {
    constructor(db, collectionName) {
        this.collection = db.collection(collectionName);
    }
    create(data) {
        return this.collection.create(data, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
    insertMany(data) {
        return this.collection.insertMany(data, (err, result) => {
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
    findOneAndDelete(query) {
        return this.collection.findOneAndDelete(query, (err, result) => {
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
    Aggreagate(query) {
        return this.collection.aggregate(query, (err, result) => {
            if (err)
                return err;
            return result;
        });
    }
}
exports.MongoRepository = MongoRepository;
//# sourceMappingURL=mongo.repository.js.map