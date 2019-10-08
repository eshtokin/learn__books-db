import {Db, Collection} from 'mongoose';

export abstract class MongoRepository {
  public readonly collection: Collection;

  constructor(db: Db) {
    this.collection = db;
  }

  public create(data) {
    return this.collection.create(data, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public insertMany(data) {
    return this.collection.insertMany(data, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public find(query) {
    return  this.collection.find(query, (err, result) => {
      if (err) return err;  
      return result
    })
  }

  public findById(query) {
    return this.collection.findById(query, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public findOne(query) {
    return this.collection.findOne(query, (err, result) => {
      if (err) return err
      return result;
    })
  }
  
  public findOneAndDelete(query) {
    return this.collection.findOneAndDelete(query, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public findOneAndUpdate(query, data) {
    return this.collection.findOneAndUpdate(query, data, {new: true}, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public aggreagate(query) {
    return this.collection.aggregate(query, (err, result) => {
      if (err) return err;
      return result
    })
  }
}