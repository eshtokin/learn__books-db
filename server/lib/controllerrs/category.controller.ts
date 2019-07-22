import * as mongoose from 'mongoose'
import { CategorySchema } from '../models/category.model'
import { Request, Response } from 'express'

export const Category = mongoose.model('Category', CategorySchema);

export class CategoryController {
  public getAllCategory(req: Request, res: Response) {
    Category.find({}, (err, categories) => {
      if (err) {
        res.send(err)
      }
      res.json(categories)
    })
  }

  public addCategory(req: Request, res: Response) {
    Category.findOne({name: req.body.name}, (err, category) => {
      if (err) {
        return res.status(500).send({
          message: 'error on the server'
        })
      }
      if (category) {
        return res.status(400).send({
          message: 'category already exist'
        })
      }

      Category.create({
        name: req.body.name
      }, (err, category) => {
        res.status(200).send({
          message: 'successful'
        })
      })
    })
  }

  public deleteCategory(req: Request, res: Response) {
    Category.findOneAndDelete({name: req.body.name}, (err) => {
      if (err) {
        return res.send(err)
      }
      res.status(200).send({
        message: 'successfuly deleted'
      })
    })
  }
}