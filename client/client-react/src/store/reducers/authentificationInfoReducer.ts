import * as authConstant from './../constants/authentificatedInfoConstant';
import UserInfoService from '../../service/user-info.service';
import { User } from '../../models/user.model';

const UserInfo = UserInfoService;

export interface AuthentificationState {
  isLogined: boolean;
  role: number;
  modalStatus: boolean;
}

export interface AuthentificationAction {
  type: string;
  payload: boolean | number;
}

export const initialAuthState = {
  isLogined: UserInfo.getCurrentUser() ? true : false,
  role: localStorage.hasOwnProperty('token')
  ? (UserInfo.getCurrentUser() as User).role
  : 0,
  modalStatus: false
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
    case authConstant.SET_MODAL_STATUS:
      return {
        ...state,
        modalStatus: action.payload as boolean
      }
    default:
      return state;
  }
}