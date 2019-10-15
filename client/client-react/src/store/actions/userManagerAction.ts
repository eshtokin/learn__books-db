import { User } from "../../models/user.model";
import * as userManagerConstant from "../constants/userManagerConstant";
import { PaginationEvent } from "../../models/pagination-event.model";
import UserService from "../../service/users.service";

const userService = UserService;

export const setUserAtPage = (listOfUser: User[], totalCount: number) => {
  return {
    type: userManagerConstant.SET_USER_AT_PAGE,
    payload: {
      listOfUser,
      totalCount
    }
  }
}

export const addUser = (user: User) => {
  return async () => {
    const response = await userService.registrate(user)
    if (response.status === 200) {
      alert('User was added')
    }
  }
}

export const getAllUsers = (pagination: PaginationEvent) => {
  return async (dispatch: any) => {
    const responseWithUser = await userService.getAllUsers(pagination)
    pagination.length = responseWithUser[0].totalCount[0].count;
    dispatch(setUserAtPage(responseWithUser[0].listOfItem as User[], responseWithUser[0].totalCount[0].count));
  }
}

export const editeUser = (userId: string, user: User) => {
  return async () => {
    await userService.edit(userId, user)
  }
}

export const deleteUser = (userId: string) => {
  return async () => {
    const response = await userService.delete(userId);
    if (response.status === 200) {
      alert('successfuly deleted');
    }
  }
}

export function searchUserByEmail (userEmail: string, pagination: PaginationEvent) {
  return async (dispatch: any) => {
  const responseWithUser = await userService.getSomeUsers(userEmail, pagination)
    if (responseWithUser[0].listOfItem.length) {
      pagination.length = responseWithUser[0].totalCount[0].count;
      dispatch(setUserAtPage(responseWithUser[0].listOfItem as User[], responseWithUser[0].totalCount[0].count))
    } else {
      alert('User not found')
    }
  }
}