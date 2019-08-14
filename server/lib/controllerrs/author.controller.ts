import * as mongoose from 'mongoose'
import { AuthorSchema } from '../models/author.model'
import { Request, Response } from 'express'
import { MongoDbService } from '../service/mongodb.service'

export const Authors = mongoose.model('Author', AuthorSchema);

const mongoDbService = new MongoDbService()
export class AuthorController {
  public getAllAuthor(req: Request, res: Response) {
    const query = {};
    mongoDbService.find(Authors, query)
    .then(value => {
      res.send(value)
    })
    .catch(err => res.send(err))
  }

  public getAuthor(req: Request, res: Response) {
    const query = req.params.authorId;

    mongoDbService.findById(Authors, query)
    .then(value =>{
      res.send(value)
    })
    .catch(err => res.send(err))
  }

  public addAuthor(req: Request, res: Response) {

    mongoDbService.findOne(Authors, {name: req.body.name})
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
    
    mongoDbService.create(Authors, data)
    .then(res.status(200).send({
      message: 'successful'
    }))
    .catch(err => res.status(500).send({
      message: 'error on the server'
    }))
  }

  public deleteAuthor(req: Request, res: Response) {
    const query = {name: req.body.name};
    
    mongoDbService.findOneAndDelete(Authors, query)
    .then(value => {
      return res.send({message: "successfuly deleted"})
    })
    .catch(err => res.send(err))
  }
}