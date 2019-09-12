import { User } from "../../models/user.model";
import { SET_USER_AT_PAGE } from "../constants/userManagerConstant";

export const setUserAtPage = (listOfUser: User[]) => {
  return {
    type: SET_USER_AT_PAGE,
    payload: listOfUser
  }
}