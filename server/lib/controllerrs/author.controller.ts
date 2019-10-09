import { Authors } from './../entities/author.model'
import { Request, Response } from 'express'
import AuthorRepository from './../repositories/author.repository'
import AuthorService from './../services/author.service';
import AuthorAndCategory from 'models/author-and-category.model';
import AddAuthorReques from 'models/request/author-controller/add-author.model';

export const authorRepository = new AuthorRepository(Authors);
const serviceAuthor =  new AuthorService();

export class AuthorController {
  public getAllAuthor(req: Request, res: Response): void { // req without params
    serviceAuthor.getAllAuthor()
    .then((value: AuthorAndCategory[]) => {
      res.send(value);
    });
  }

  public addAuthor(req: AddAuthorReques, res: Response): void {
    serviceAuthor.addAuthor(req.body.name)
  }
}