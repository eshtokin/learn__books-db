import UserRepository from "./../repositories/user.repository";
import { User } from "./../entities/user.model";
import * as jwt from "jsonwebtoken"
import * as mongoose from "mongoose"
import * as crypt from "bcryptjs"

export const userRepository = new UserRepository(User);

export default class UserService {
  public makeAgreagationQueryForUser() {
    return {
      $lookup: {
        from: "books",
        localField: "books",
        foreignField: "_id",
        as: "book_list"
     }
    }
  }
  
  public makePaginationQueryForUser(req) {
    const pagination = JSON.parse(req.query.pagination);

    const skip = {
      $skip: (pagination.pageIndex) * (pagination.pageSize)
    };
    const limit = {
      $limit: (pagination.pageSize)
    }
    let query = {
      $facet: {
        listOfItem: [
          skip, 
          limit
        ],
        totalCount: [
          {
            $count: 'count'
          }
        ]
      }
    };

    return query;
  }

  public async getAllUsers(req) {
    const agreagationQuery: object[] = [
      this.makeAgreagationQueryForUser(),
      this.makePaginationQueryForUser(req),
    ];

    return await userRepository.Aggreagate(agreagationQuery)
  }

  public async getSomeUser(req) {
    const agreagationQuery: object[]= [
      {
        $match: {
          email: {
            $regex: `.*${req.query.searchString? req.query.searchString : ' '}*`,
            $options: 'i'
          }
        }
      },
      this.makeAgreagationQueryForUser(),
      this.makePaginationQueryForUser(req),
    ];

    return await userRepository.Aggreagate(agreagationQuery)
  }

  public async getUserById(req) {
    const query = {
      _id: req.params.userId
    };

    return await userRepository.findById(query)
    .then(value => {
      value.password = '';
      return value;
    })
  }

  public async getFavoriteBookFromUser(req) {
    const user = jwt.decode(req.headers.authorization);

    const query = {
        _id: user.id
    };

    return await userRepository.find(query)
  }

  public async updateUser(req) {
    const data = req.body;

    if (req.body.password === '' ) {
      delete data.password
    } else if (req.body.password[0] !== '$') {
      data.password = crypt.hashSync(req.body.password)
    }

    if (req.body.books) {
      data.books = req.body.books.map(book => {
        return mongoose.Types.ObjectId(book)
      })
    }

    const query = {
      _id: req.body._id
    };

    return await userRepository.findOneAndUpdate(query, data)
  }

  public async deleteUser(req) {
    const query = {
      _id: req.params.userId
    };
    return await userRepository.findOneAndDelete(query)
  }

  public async addBookToProfile(req) {
    const user = jwt.decode(req.headers.authorization);
        
    const query = {
        _id: mongoose.Types.ObjectId(user.id)
      };
      const data = {
        $addToSet: { books: mongoose.Types.ObjectId(req.params.bookId)}
    };

    return await userRepository.findOneAndUpdate(query, data)
  }
}