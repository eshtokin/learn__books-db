import { SET_BOOK_AT_PAGE } from "../constants/bookManagerConstant"
import { Book } from "../../models/book.model"


export const setBookAtPage = (listOfBook: Book[]) => {
  return {
    type: SET_BOOK_AT_PAGE,
    payload: listOfBook
  }
}
