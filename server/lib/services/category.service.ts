import { Category } from './../entities/category.model'
import CategoryRepository from './../repositories/category.repository';


export const categoryRepository = new CategoryRepository(Category);

export default class CategoriService {
  public async getAllCategory(req) {
    const query = {};
    return await categoryRepository.find(query)
  }

  public async addCategory(req) {
    const query = {
      name: req.body.name
    };
    
    let resultOfSearch;

    await categoryRepository.findOne(query)
    .then((result) => {
      resultOfSearch = result
    });

    if (resultOfSearch) {
      return resultOfSearch
    }

    await categoryRepository.create(query)
    .then(result => {
      resultOfSearch = result
    });

    return resultOfSearch;
  }

  public async deleteCategory(req) {
    const query = {
      name: req.body.name
    };

    return await categoryRepository.findOneAndDelete(query)
  }

}