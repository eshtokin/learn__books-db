import UserRepository from "./../repositories/user.repository";
import * as jwt from "jsonwebtoken"
import * as mongoose from "mongoose"
import * as crypt from "bcryptjs"
import { keys } from "../keys/config";
import { UserModel, UserRoles } from "./../entities/user.model";
import AgreagationQuery from "./../models/agreagation-query.model";
import { AgreagationUserResponse } from "./../models/agreagation-response.model";
import User from "./../models/user.mdoel";
import AuthResponse from "./../models/auth-response.model";
import { ErrorHandler } from "./../common/helpers/errorHandler";
import NotAuthorizedException from "./../common/exceptions/not-authorized.exception";

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
  }

  public async getUserById(userId): Promise<User> {
      const query = {
        _id: userId
      };
      const user = await userRepository.findById(query)
      user.password = '';
      return user;
  }

  public async getFavoriteBookFromUser(authorization: string): Promise<string[]> {
    const userInfoFromToken = jwt.decode(authorization);

    const query = {
      _id: userInfoFromToken.id
    };
  
    let user: User = await userRepository.findOne(query)
  
    return user.books;
  }

  public async updateUser(user: User): Promise<User> {
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
  }

  public async deleteUser(req): Promise<User> {
    const query = {
      _id: req.params.userId
    };
    return await userRepository.findOneAndDelete(query)
  }

  public async addBookToProfile(authorization: string, bookId: string): Promise<User> {
    const user = jwt.decode(authorization);
      
    const query = {
        _id: mongoose.Types.ObjectId(user.id)
      };
      const data = {
        $addToSet: { books: mongoose.Types.ObjectId(bookId)}
    };

    return await userRepository.findOneAndUpdate(query, data)
  }

  public async findOneByEmail(email: string): Promise<User> {
    const query = {
      email
    };

    return await userRepository.findOne(query)
  }

  public async createUser(user: User): Promise<User> {
    const newUser = {
      email: user.email,
      password: crypt.hashSync(user.password),
      name: user.name,
      books: [],
      role: user.role || UserRoles.user,
      image: 'https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png'
    }

    return await userRepository.create(newUser)
  }

  public async loginUser(loginData: {email: string, password: string}): Promise<AuthResponse> {
    const user = await this.findOneByEmail(loginData.email);
    
    if (!user) {
      throw new NotAuthorizedException()
    }

    const passwordIsValid = crypt.compareSync(loginData.password, user.password);
    if (!passwordIsValid) {
      throw new ErrorHandler(401, 'Authorization failed')
    }
    
    const token = jwt.sign({
      id: user._id,
      password: '',
      email: user.email,
      name: user.name,
      role: user.role
    }, keys.privateKey);

    return {
      authorization: true,
      token,
    }
  }
  
  public async registrateUser(userFromQuery: User): Promise<void> {
    const user = await this.findOneByEmail(userFromQuery.email)
    if (!user) {
      this.createUser(userFromQuery)
    }
  }
}