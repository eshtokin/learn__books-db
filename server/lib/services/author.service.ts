import AuthorRepository from "./../repositories/author.repository";
import { Authors } from "./../entities/author.model";

export const authorRepository = new AuthorRepository(Authors);

export default class AuthorService {
  public async getAllAuthor() {
    const query = {};
    return await authorRepository.find(query)
  }

  public async getAuthor(req) {
    const query = req.params.authorId;
    return await authorRepository.findById(query);
  }

  public async addAuthor(req, res) {
    await authorRepository.findOne({name: req.body.name})
    .then(value => {
      return res.status(400).send({
        meessage: 'author already exist'
      })
    })
    .catch(err => {
      return res.status(500).send({
        message: 'error on the server'
      })
    })

    const data = {
      name: req.body.name
    }
    
    await authorRepository.create(data)
    .then(res.status(200).send({
      message: 'successful'
    }))
    .catch(err => res.status(500).send({
      message: 'error on the server'
    }))

    return 'checked or created'
  }

  public async deleteAuthor(req, res) {
    const query = {name: req.body.name};
    
    authorRepository.findOneAndDelete(query)
    .then(value => {
      return res.send({message: "successfuly deleted"})
    })
    .catch(err => res.send(err))
  }
}