import * as mongoose from 'mongoose'
import { CategorySchema } from '../models/category.model'
import { Request, Response } from 'express'
import {MongoDbService} from '../service/mongodb.service'

export const Category = mongoose.model('Category', CategorySchema);

const mongoDbService = new MongoDbService();

export class CategoryController {
  public getAllCategory(req: Request, res: Response) {
    const query = {};
    mongoDbService.find(Category, query)
    .then(value => {
      res.send(value)
    })
    .catch(err => {
      res.send(err)
    });
  }

  public addCategory(req: Request, res: Response) {
    const query = {
      name: req.body.name
    };
    mongoDbService.findOne(Category, query)
    .then(value => {
      if (value) {
        return res.status(400).send({
          message: 'category already exist'
        })
      }
      mongoDbService.create(Category, query)
      .then(() => {
        return res.status(200).send({
          message: 'successful'
        })
      })
    })
    .catch(err => {
      res.status(500).send({
        message: 'error on the server'
      })
    })
  }

  public deleteCategory(req: Request, res: Response) {
    const query = {
      name: req.body.name
    };

    mongoDbService.findOneAndDelete(Category, query)
    .then(() => {
      return res.status(200).send({
        message: 'successfuly deleted'
      })
    })
    .catch(err => {
      return res.send(err)
    })
  }
}