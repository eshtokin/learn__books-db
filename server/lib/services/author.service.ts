import AuthorRepository from "./../repositories/author.repository";
import { Authors } from "./../entities/author.model";
import AuthorAndCategory from "../models/author-and-category.model";

export const authorRepository = new AuthorRepository(Authors);

export default class AuthorService {
  public async getAllAuthor() {
    const query = {};
    return await authorRepository.find(query)
  }

  public async getAuthor(req): Promise<any> {
    const query = req.params.authorId;
    return await authorRepository.findById(query);
  }

  public async addAuthor(req, res): Promise<AuthorAndCategory> {
    await authorRepository.findOne({name: req.body.name})
    .then(() => res.status(400).send({
      meessage: 'author already exist'
    }))
    .catch(err => res.status(500).send({
        message: 'error on the server'
      })
    )

    const data = {
      name: req.body.name
    }
    
    return await authorRepository.create(data)
  }

  // public async deleteAuthor(req, res): Promise<void> {
  //   const query = {name: req.body.name};
    
  //   await authorRepository.findOneAndDelete(query)
  //   .then(value => {
  //     return res.send({message: "successfuly deleted"})
  //   })
  //   .catch(err => res.send(err))
  // }
}