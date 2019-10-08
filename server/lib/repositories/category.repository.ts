import { MongoRepository } from "./base/mongo.repository";
import AuthorAndCategory from "models/author-and-category.model";

export default class CategoryRepository extends MongoRepository {

  public async create(data): Promise<AuthorAndCategory> {
    return await this.collection.create(data, (err, result: AuthorAndCategory) => {
      if (err) return err;
      return result;
    })
  }

  public findOneAndDelete(query): Promise<AuthorAndCategory> {
    return this.collection.findOneAndDelete(query, (err, result: AuthorAndCategory) => {
      if (err) return err;
      return result;
    })
  }

  public find(query): Promise<AuthorAndCategory[]> {
    return  this.collection.find(query, (err, result: AuthorAndCategory) => {
      if (err) return err;  
      return result
    })
  }
  
  public findOne(query): Promise<AuthorAndCategory> {
    return this.collection.findOne(query, (err, result: AuthorAndCategory) => {
      if (err) return err
      return result;
    })
  }

  public insertMany(data): Promise<AuthorAndCategory[]> {
    return this.collection.insertMany(data, (err, result: AuthorAndCategory[]) => {
      if (err) return err;
      return result;
    })
  }
};