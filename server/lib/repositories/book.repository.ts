import { MongoRepository } from "./base/mongo.repository";
import { AgreagationBookResponse } from "models/agreagation-response.model";
import Book from "./../models/book.model";

export default class BookRepository extends MongoRepository {
  
  public aggreagate(query): Promise<AgreagationBookResponse> {
    return this.collection.aggregate(query, (err, result: AgreagationBookResponse) => {
      if (err) return err;
      return result
    })
  }

  public findOneAndDelete(query): Promise<Book> {
    return this.collection.findOneAndDelete(query, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public findById(query): Promise<Book> {
    return this.collection.findById(query, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public findOne(query): Promise<Book> {
    return this.collection.findOne(query, (err, result) => {
      if (err) return err
      return result;
    })
  }
  
  public find(query): Promise<Book[]> {
    return  this.collection.find(query, (err, result) => {
      if (err) return err;  
      return result
    })
  }

  public create(data): Promise<Book> {
    return this.collection.create(data, (err, result) => {
      if (err) return err;
      return result;
    })
  }
  
  public findOneAndUpdate(query, data): Promise<Book> {
    return this.collection.findOneAndUpdate(query, data, {new: true}, (err, result: Book) => {
      if (err) return err;
      return result;
    })
  }
};