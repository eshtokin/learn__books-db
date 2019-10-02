
import { User } from '../../models/user.model';
import * as userManagerConstant from '../constants/userManagerConstant';

export interface UserReducerAction {
  type: string;
  payload: any;
}

export interface UserManagerStore {
  usersAtPage: User[]
}

export function userManager(state: UserManagerStore = {usersAtPage: []}, action: UserReducerAction): UserManagerStore {
  switch(action.type) {
    case userManagerConstant.SET_USER_AT_PAGE:
      return {
        usersAtPage: action.payload.listOfUser
      }
    case userManagerConstant.ADD_USER:
      return state;
    case userManagerConstant.DELETE_USER:
      return state;

    default:
      return state;
  }
}
