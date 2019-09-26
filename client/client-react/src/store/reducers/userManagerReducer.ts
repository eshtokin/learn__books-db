
import { User } from '../../models/user.model';
import * as userManagerConstant from '../constants/userManagerConstant';
import { UserService } from '../../service/users.service';
import { PaginationEvent } from '../../models/pagination-event.model';

export interface UserReducerAction {
  type: string;
  payload: any;
  pagination?: PaginationEvent;
}

export interface UserManagerStore {
  usersAtPage: User[]
}

const userService = new UserService();

export function userManagerReducer(state: UserManagerStore = {usersAtPage: []}, action: UserReducerAction): UserManagerStore {
  switch(action.type) {
    case userManagerConstant.SET_USER_AT_PAGE:
      return {
        usersAtPage: action.payload
      }

    case userManagerConstant.ADD_USER:
      userService.registrate(action.payload as User)
      .then(response => {
        if (response.status === 200) {
          alert('User was added')
        }
      })
      return state;
    case userManagerConstant.DELETE_USER:
      userService.delete(action.payload as string)
      .then(response => {
        console.log(response);
      });
    return state;

    case userManagerConstant.SEARCH_USER_BY_EMAIL:
      userService.getSomeUsers(action.payload as string, action.pagination as PaginationEvent)
      .then(response => {
        console.log(response);
      })
    return state;
    default:
      return state;
  }
}
