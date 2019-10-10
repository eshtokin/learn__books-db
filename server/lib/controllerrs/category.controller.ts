import { Response } from 'express'
import CategoriService from './../services/category.service';

const categoryService = new CategoriService();

export class CategoryController {
  public getAllCategory(req: Request, res: Response): void {
    categoryService.getAllCategory()
    .then(value => res.send(value))
    .catch(err => {
      res.send(err)
    });
  }
}