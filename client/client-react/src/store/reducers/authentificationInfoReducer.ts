import * as authConstant from './../constants/authentificatedInfoConstant';
import { UserInfoService } from '../../service/user-info.service';
import { User } from '../../models/user.model';

const UserInfo = new UserInfoService();

export interface AuthentificationState {
  isLogined: boolean;
  role: number;
}

export interface AuthentificationAction {
  type: string;
  payload: boolean | number;
}

export const initialAuthState = {
  isLogined: UserInfo.getCurrentUser() ? true : false,
  role: localStorage.hasOwnProperty('token')
  ? (UserInfo.getCurrentUser() as User).role
  : 0
}

export function authentificatedInfo(state: AuthentificationState =  initialAuthState, action: AuthentificationAction): AuthentificationState {
  switch(action.type) {
    case authConstant.SET_STATUS:
      return {
        ...state,
        isLogined: action.payload as boolean
      }
    case authConstant.SET_ROLE:
      return {
        ...state,
        role: action.payload as number
      }
    default:
      return state;
  }
}