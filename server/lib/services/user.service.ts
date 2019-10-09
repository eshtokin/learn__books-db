import UserRepository from "./../repositories/user.repository";
import * as jwt from "jsonwebtoken"
import * as mongoose from "mongoose"
import * as crypt from "bcryptjs"
import { AuthConfig } from "./../enviroments/config";
import { User } from "./../entities/user.model";
import AgreagationQuery from "./../models/agreagation-query.model";
import { AgreagationUserResponse } from "./../models/agreagation-response.model";
import UserInterface from "./../models/user.mdoel";
import AuthResponse from "./../models/auth-response.model";

export const userRepository = new UserRepository(User);

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

  public async getAllUsers(req): Promise<AgreagationUserResponse> {
    const agreagationQuery: object[] = [
      this.makeAgreagationQueryForUser(),
      this.makePaginationQueryForUser(req),
    ];

    return await userRepository.aggreagate(agreagationQuery)
  }

  public async getSomeUser(req): Promise<AgreagationUserResponse> {
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

    return await userRepository.aggreagate(agreagationQuery)
  }

  // public async getUserById(req): Promise<UserInterface> {
  //   const query = {
  //     _id: req.params.userId
  //   };

  //   return await userRepository.findById(query)
  //   .then(value => {
  //     value.password = '';
  //     return value;
  //   })
  // }

  public async getFavoriteBookFromUser(req): Promise<string[]> {
    const user = jwt.decode(req.headers.authorization);

    const query = {
        _id: user.id
    };
    
    let userBooks: string[] = [];

    await userRepository.find(query)
    .then(result => userBooks = result[0].books)

    return userBooks;
  }

  public async updateUser(req): Promise<UserInterface> {
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

  public async deleteUser(req): Promise<UserInterface> {
    const query = {
      _id: req.params.userId
    };
    return await userRepository.findOneAndDelete(query)
  }

  public async addBookToProfile(req): Promise<UserInterface> {
    const user = jwt.decode(req.headers.authorization);
        
    const query = {
        _id: mongoose.Types.ObjectId(user.id)
      };
      const data = {
        $addToSet: { books: mongoose.Types.ObjectId(req.params.bookId)}
    };

    return await userRepository.findOneAndUpdate(query, data)
  }

  public async findOne(req): Promise<UserInterface> {
    const query = {
      email: req.body.email
    };

    return await userRepository.findOne(query)
  }

  public async createUser(req): Promise<UserInterface> {
    const newUser = {
      email: req.body.email,
      password: crypt.hashSync(req.body.password),
      name: req.body.name,
      books: [],
      role: req.body.role || 2,
      image: 'https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png'
    }

    return await userRepository.create(newUser)
  }

  public async loginUser(req): Promise<AuthResponse> {
    return await this.findOne(req)
    .then(user => {
      if (!user) {
        throw(new Error('User not found'))
      }

      const passwordIsValid = crypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        throw(new Error('Authorization failed'))
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
    })
  }
  
  public async registrateUser(req): Promise<void> {
    await this.findOne(req)
    .then(user => {
      if (!user) {
        this.createUser(req)
      }
    })      
  }
}