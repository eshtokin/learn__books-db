import { MongoRepository } from "./base/mongo.repository";
import {AgreagationUserResponse} from "../models/agreagation-response.model";
import User from "./../models/user.mdoel";

export default class UserRepository extends MongoRepository {

  public aggreagate(query): AgreagationUserResponse {
    return this.collection.aggregate(query, (err, result) => {
      if (err) return err;
      return result
    })
  }

  public async create(data): Promise<User> {
    return await this.collection.create(data, (err, result: User) => {
      if (err) return err;
      return result;
    })
  }
  
  public findById(query): Promise<User> {
    return this.collection.findById(query, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public findOneAndUpdate(query, data): Promise<User> {
    return this.collection.findOneAndUpdate(query, data, {new: true}, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public findOneAndDelete(query): Promise<User> {
    return this.collection.findOneAndDelete(query, (err, result) => {
      if (err) return err;
      return result;
    })
  }
};