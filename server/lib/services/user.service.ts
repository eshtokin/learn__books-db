import UserRepository from "./../repositories/user.repository";
import { User } from "./../entities/user.model";
import * as jwt from "jsonwebtoken"
import * as mongoose from "mongoose"
import * as crypt from "bcryptjs"
import { AuthConfig } from "./../enviroments/config";

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

    return await userRepository.aggreagate(agreagationQuery)
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

    return await userRepository.aggreagate(agreagationQuery)
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

  public async findOne(req) {
    const query = {
      email: req.body.email
    };

    return await userRepository.findOne(query)
  }

  public async createUser(req) {
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

  public async loginUser(req) {
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
  
  public async registrateUser(req) {
    await this.findOne(req)
    .then(user => {
      if (!user) {
        this.createUser(req)
      }
    })      
  }
}