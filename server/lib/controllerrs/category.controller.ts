import { Response, NextFunction } from 'express'
import CategoriService from './../services/category.service';

const categoryService = new CategoriService();

export class CategoryController {
  public getAllCategory(req: Request, res: Response, next: NextFunction): void {
    categoryService.getAllCategory()
    .then(value => res.send(value))
    .catch(next);
  }
}