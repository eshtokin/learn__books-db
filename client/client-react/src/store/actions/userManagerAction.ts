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
    await userService.registrate(user)
    .then(response => {
      if (response.status === 200) {
        alert('User was added')
      }
    })
  }
}

export const getAllUsers = (pagination: PaginationEvent) => {
  return async (dispatch: any) => {
    await userService.getAllUsers(pagination)
    .then(response => {
      pagination.length = response[0].totalCount[0].count
      dispatch(setUserAtPage(response[0].listOfItem as User[], response[0].totalCount[0].count))
    })
  }
}

export const editeUser = (userId: string, user: User) => {
  return async () => {
    await userService.edit(userId, user)
    .then(response => {
      if (response.status === 200) {
        
      }
    })
  }
}

export const deleteUser = (userId: string) => {
  return async () => {
    await userService.delete(userId)
    .then(response => {
      if (response.status === 200) {
        alert('successfuly deleted');
      }
    });
  }
}

export function searchUserByEmail (userEmail: string, pagination: PaginationEvent) {
  return async (dispatch: any) => {
    await userService.getSomeUsers(userEmail, pagination)
    .then((response) => {
      if (response[0].listOfItem.length) {
        pagination.length = response[0].totalCount[0].count;
        dispatch(setUserAtPage(response[0].listOfItem as User[], response[0].totalCount[0].count))
      } else {
        alert('User not found')
      }
    })
  }
}