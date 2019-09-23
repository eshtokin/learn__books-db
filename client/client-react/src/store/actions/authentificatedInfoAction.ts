import * as authConstant from './../constants/authentificatedInfoConstant';

enum Role {
  Admin = 1,
  User
}

export const setUserStatus = (status: boolean) => {
  return {
    type: authConstant.SET_STATUS,
    payload: status
  }
}

export const setuserRole = (role: Role) => {
  return {
    type: authConstant.SET_ROLE,
    payload: role
  }
}