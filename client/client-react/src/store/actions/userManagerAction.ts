import { User } from "../../models/user.model";
import * as userManagerConstant from "../constants/userManagerConstant";
import { PaginationEvent } from "../../models/pagination-event.model";

export const setUserAtPage = (listOfUser: User[]) => {
  return {
    type: userManagerConstant.SET_USER_AT_PAGE,
    payload: listOfUser
  }
}

export const addUser = (user: User) => {
  return {
    type: userManagerConstant.ADD_USER,
    payload: user
  }
}
export const deleteUser = (userId: string) => {
  return {
    type: userManagerConstant.DELETE_USER,
    payload: userId
  }
}
export const searchUserByEmail = (userEmail: string, pagination: PaginationEvent) => {
  return {
    type: userManagerConstant.SEARCH_USER_BY_EMAIL,
    payload: userEmail
  }
}
export const getAllUser = () => {
  return {
    type: userManagerConstant.GET_ALL_USERS,
    payload: null
  }
}