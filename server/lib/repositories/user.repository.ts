import { MongoRepository } from "./base/mongo.repository";
import {AgreagationUserResponse} from "../models/agreagation-response.model";
import UserInterface from "./../models/user.mdoel";

export default class UserRepository extends MongoRepository {

  public aggreagate(query): AgreagationUserResponse {
    return this.collection.aggregate(query, (err, result) => {
      if (err) return err;
      return result
    })
  }

  public async create(data): Promise<UserInterface> {
    return await this.collection.create(data, (err, result: UserInterface) => {
      if (err) return err;
      return result;
    })
  }
  
  public findById(query): Promise<UserInterface> {
    return this.collection.findById(query, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public findOneAndUpdate(query, data): Promise<UserInterface> {
    return this.collection.findOneAndUpdate(query, data, {new: true}, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public findOneAndDelete(query): Promise<UserInterface> {
    return this.collection.findOneAndDelete(query, (err, result) => {
      if (err) return err;
      return result;
    })
  }
};