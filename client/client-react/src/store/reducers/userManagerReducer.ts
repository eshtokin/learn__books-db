
import { User } from '../../models/user.model';
import { SET_USER_AT_PAGE } from '../constants/userManagerConstant';

export interface UserReducerAction {
  type: string;
  payload: User[];
}

export interface UserManagerStore {
  usersAtPage: User[]
}

export function userManagerReducer(state: UserManagerStore = {usersAtPage: []}, action: UserReducerAction): UserManagerStore {
  switch(action.type) {
    case SET_USER_AT_PAGE:
      return {
        usersAtPage: action.payload
      }
    default:
      return state;
  }
}
