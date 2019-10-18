import { Category } from './../entities/category.model'
import CategoryRepository from './../repositories/category.repository';
import AuthorAndCategory from './../models/author-and-category.model';
import HttpException from '../common/exceptions/error-handler.exception';


export const categoryRepository = new CategoryRepository(Category);

export default class CategoriService {
  public async getAllCategory(): Promise<AuthorAndCategory[]> {
    const query = {};
    return await categoryRepository.find(query)
  }

  // public async addCategory(req): Promise<AuthorAndCategory> {
  //   const query = {
  //     name: req.body.name
  //   };
    
  //   let resultOfSearch: AuthorAndCategory;

  //   await categoryRepository.findOne(query)
  //   .then((result) => {
  //     resultOfSearch = result
  //   });

  //   if (resultOfSearch) {
  //     return resultOfSearch
  //   }

  //   await categoryRepository.create(query)
  //   .then(result => {
  //     resultOfSearch = result
  //   });

  //   return resultOfSearch;
  // }

  // public async deleteCategory(req): Promise<AuthorAndCategory> {
  //   const query = {
  //     name: req.body.name
  //   };

  //   return await categoryRepository.findOneAndDelete(query)
  // }
}