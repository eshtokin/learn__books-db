import * as authConstant from './../constants/authentificatedInfoConstant';
import { UserInfoService } from '../../service/user-info.service';

const UserInfo = new UserInfoService();

export interface AuthentificationState {
  isLogined: boolean;
  role: number;
}

export interface AuthentificationAction {
  type: string;
  payload: boolean | number;
}

export function authentificatedInfoReducer(state: AuthentificationState = {
  isLogined: UserInfo.getCurrentUser() ? true : false,
  role: 2
} , action: AuthentificationAction): AuthentificationState {
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