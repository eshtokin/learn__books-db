import * as authConstant from './../constants/authentificatedInfoConstant';
import UserService from '../../service/users.service';
import UserInfoService from '../../service/user-info.service';
import { User } from '../../models/user.model';
import { Props } from '../../component/AuthForm/AuthFormLogin/authFormLogin';

enum Role {
  Admin = 1,
  User
}

const userService = UserService;
const userInfoService = UserInfoService;

export const setUserStatus = (status: boolean) => {
  return {
    type: authConstant.SET_STATUS,
    payload: status
  }
}

export const setUserRole = (role: Role) => {
  return {
    type: authConstant.SET_ROLE,
    payload: role
  }
}

export const login = (user: {email: string, password: string}, props: Props) => {
  return async (dispatch: any) => {
    userService.login(user)
    .then((response) => {
      if (response.status === 200) {
        dispatch(setUserStatus(true));
        dispatch(setUserRole((userInfoService.getCurrentUser() as User).role));
        props.history.push({
          pathname: '/profile'
        });
      }
    })
    .catch(err => {
      dispatch(toggleModalStatus(true))
    })
  }
}

export const toggleModalStatus = (flag: boolean) => {
  return {
    type: authConstant.SET_MODAL_STATUS,
    payload: flag
  }
}