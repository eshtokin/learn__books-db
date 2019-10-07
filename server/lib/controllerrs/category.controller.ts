import * as mongoose from 'mongoose'
import { Category } from './../entities/category.model'
import { Request, Response } from 'express'
import CategoryRepository from './../repositories/category.repository';

export const RCategory = new CategoryRepository(Category);

export class CategoryController {
  public getAllCategory(req: Request, res: Response) {
    const query = {};
    RCategory.find(query)
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
    RCategory.findOne(query)
    .then(value => {
      if (value) {
        return res.status(400).send({
          message: 'category already exist'
        })
      }
      RCategory.create(query)
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

    RCategory.findOneAndDelete(query)
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