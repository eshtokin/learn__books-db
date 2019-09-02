export class MongoDbService {
  public create(collection, data) {
    return collection.create(data, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public insertMany(collection, data) {
    return collection.insertMany(data, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public find(collection, query) {
    return  collection.find(query, (err, result) => {
      if (err) return err;  
      return result
    })
  }

  public findById(collection, query) {

    return collection.findById(query, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public findOne(collection, query) {
    return collection.findOne(query, (err, result) => {
      if (err) return err
      return result;
    })
  }
  
  public findOneAndDelete(collection, query) {
    return collection.findOneAndDelete(query, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public findOneAndUpdate(collection, query, data) {
    return collection.findOneAndUpdate(query, data, {new: true}, (err, result) => {
      if (err) return err;
      return result;
    })
  }

  public Aggreagate(collection, query) {
    return collection.aggregate(query, (err, result) => {
      if (err) return err;
      return result
    })
  }
}