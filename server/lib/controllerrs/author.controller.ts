import { Authors } from './../entities/author.model'
import { Request, Response } from 'express'
import AuthorRepository from './../repositories/author.repository'
import AuthorService from './../services/author.service';

export const authorRepository = new AuthorRepository(Authors);
const serviceAuthor =  new AuthorService();

export class AuthorController {
  public getAllAuthor(req: Request, res: Response) {
    serviceAuthor.getAllAuthor()
    .then(value => {
      res.send(value);
    });
  }

  public getAuthor(req: Request, res: Response) {
    serviceAuthor.getAuthor(req)
    .then(value => res.send(value));
  }

  public addAuthor(req: Request, res: Response) {    
    serviceAuthor.addAuthor(req, res)
  }

  public deleteAuthor(req: Request, res: Response) {
    serviceAuthor.deleteAuthor(req, res);
  }
}