import { MongoRepository } from "./base/mongo.repository";
import AuthorAndCategory from "../models/author-and-category.model"

export default class AuthorRepository extends MongoRepository {

  public async create(data): Promise<AuthorAndCategory> {
    return await this.collection.create(data, (err, result: AuthorAndCategory) => {
      if (err) return err;
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