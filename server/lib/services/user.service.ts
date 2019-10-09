import UserRepository from "./../repositories/user.repository";
import * as jwt from "jsonwebtoken"
import * as mongoose from "mongoose"
import * as crypt from "bcryptjs"
import { AuthConfig } from "./../enviroments/config";
import { UserModel } from "./../entities/user.model";
import AgreagationQuery from "./../models/agreagation-query.model";
import { AgreagationUserResponse } from "./../models/agreagation-response.model";
import User from "./../models/user.mdoel";
import AuthResponse from "./../models/auth-response.model";
import { ErrorHandler } from "./../common/helpers/errorHandler";

export const userRepository = new UserRepository(UserModel);

export default class UserService {
  public makeAgreagationQueryForUser(): AgreagationQuery {
    return {
      $lookup: {
        from: "books",
        localField: "books",
        foreignField: "_id",
        as: "book_list"
     }
    }
  }
  
  public makePaginationQueryForUser(paginationString: string) {
    const pagination = JSON.parse(paginationString);

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

  public async getAllUsers(pagination: string): Promise<AgreagationUserResponse> {
    const agreagationQuery: object[] = [
      this.makeAgreagationQueryForUser(),
      this.makePaginationQueryForUser(pagination),
    ];

    return await userRepository.aggreagate(agreagationQuery)
  }

  public async getUserByFilter(query: {searchString: string, pagination: string}): Promise<AgreagationUserResponse> {
    try {
      const agreagationQuery: object[]= [
        {
          $match: {
            email: {
              $regex: `.*${query.searchString? query.searchString : ' '}*`,
              $options: 'i'
            }
          }
        },
        this.makeAgreagationQueryForUser(),
        this.makePaginationQueryForUser(query.pagination),
      ];
  
      return await userRepository.aggreagate(agreagationQuery)
    } catch(error) {
      throw new ErrorHandler(500, 'Internal server error')
    }
  }

  public async getUserById(userId): Promise<User> {
    try {
      const query = {
        _id: userId
      };
  
      return await userRepository.findById(query)
      .then(value => {
        value.password = '';
        return value;
      })
    } catch(error) {
      throw new ErrorHandler(500, 'Iternal server error')
    }
  }

  public async getFavoriteBookFromUser(authorization: string): Promise<string[]> {
    try {
      const user = jwt.decode(authorization);

      const query = {
        _id: user.id
      };
      
      let userBooks: string[] = [];

      await userRepository.find(query)
      .then(result => userBooks = result[0].books)

      return userBooks;
    } catch(error) {
      throw new ErrorHandler(500, 'Internal server error')
    }
  }

  public async updateUser(user: User): Promise<User> {
    try {
      if (user.password === '' ) {
        delete user.password
      } else if (user.password[0] !== '$') {
        user.password = crypt.hashSync(user.password)
      }

      if (user.books) {
        user.books = (user.books as string[]).map(book => {
          return mongoose.Types.ObjectId(book)
        })
      }

      const query = {
        _id: user._id
      };

      return await userRepository.findOneAndUpdate(query, user)
    } catch(error) {
      throw new ErrorHandler(500, 'Internal server error')
    }
  }

  public async deleteUser(req): Promise<User> {
    try {
      const query = {
        _id: req.params.userId
      };
      return await userRepository.findOneAndDelete(query)
    } catch(error) {
      throw new ErrorHandler(500, 'Internal server error')
    }
  }

  public async addBookToProfile(authorization: string, bookId: string): Promise<User> {
    try {
      const user = jwt.decode(authorization);
        
      const query = {
          _id: mongoose.Types.ObjectId(user.id)
        };
        const data = {
          $addToSet: { books: mongoose.Types.ObjectId(bookId)}
      };

      return await userRepository.findOneAndUpdate(query, data)
    } catch(error) {
      throw new ErrorHandler(500, 'Iternal server error')
    }
  }

  public async findOne(user: User): Promise<User> {
    try {
      const query = {
        email: user.email
      };
  
      return await userRepository.findOne(query)
    } catch(error) {
      throw new ErrorHandler(500, 'Iternal server error')
    }
  }

  public async createUser(user: User): Promise<User> {
    try {
      const newUser = {
        email: user.email,
        password: crypt.hashSync(user.password),
        name: user.name,
        books: [],
        role: user.role || 2,
        image: 'https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png'
      }
  
      return await userRepository.create(newUser)
    } catch(error) {
        throw new ErrorHandler(418, 'User not found')
    }
  }

  public async loginUser(req): Promise<AuthResponse> {
    try {
      const user = await this.findOne(req);
      
      if (!user) {
        throw new ErrorHandler(418, 'User not found')
      }

      const passwordIsValid = crypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        throw new ErrorHandler(100, 'Authorization failed')
      }
      
      const token = jwt.sign({
        id: user._id,
        password: '',
        email: user.email,
        name: user.name,
        role: user.role
      }, AuthConfig.privateKey); // publicKey

      return {
        authorization: true,
        token,
      }
    } catch(error) {
      throw new ErrorHandler(500, 'Iternal server error')
    }
  }
  
  public async registrateUser(userFromQuery: User): Promise<void> {
    try {
      const user = await this.findOne(userFromQuery)
      if (!user) {
        this.createUser(user)
      }
    } catch(error) {
      throw new ErrorHandler(500, 'Iternal server error')
    }
  }
}