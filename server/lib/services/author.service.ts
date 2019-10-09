import AuthorRepository from "./../repositories/author.repository";
import { Authors } from "./../entities/author.model";
import AuthorAndCategory from "../models/author-and-category.model";

export const authorRepository = new AuthorRepository(Authors);

export default class AuthorService {
  public async getAllAuthor(): Promise<AuthorAndCategory[]> {
    return await authorRepository.find({});
  }

  // public async getAuthor(req): Promise<AuthorAndCategory> {
  //   const query = req.params.authorId;
  //   return await authorRepository.findById(query);
  // }

  public async addAuthor(name: string): Promise<AuthorAndCategory> {
    const isAuthExist = await this.isAuthorExist(name);

    if (isAuthExist) {
      const data = { name };
      return await authorRepository.create(data)
    }
  }

  public async isAuthorExist(name: string): Promise<boolean> {
    const result = await authorRepository.findOne({name})
    return result === null
    ? false
    : true;
  }
}