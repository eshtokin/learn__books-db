import { SET_BOOK_AT_PAGE, DELETE_BOOK, TOGGLE_FAVORITE_FLAG } from "../constants/bookManagerConstant"
import { Book } from "../../models/book.model"

export const setBookAtPage = (listOfBook: Book[]) => {
  return {
    type: SET_BOOK_AT_PAGE,
    payload: listOfBook
  }
}

export const deleteBookFromState = (bookId: string) => {
  return {
    type: DELETE_BOOK,
    payload: bookId
  }
}

export const favoriteFlagToggle = (bookId: string) => {
  return {
    type: TOGGLE_FAVORITE_FLAG,
    payload: bookId
  }
}