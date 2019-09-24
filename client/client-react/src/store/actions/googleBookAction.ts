import * as googleBookConstant from './../constants/googleBookConstant';
import { Book } from '../../models/book.model';

export const setListOfBook = (listOfBook: Book[]) => {
  return {
    type: googleBookConstant.SET_LIST_OF_BOOK,
    payload: listOfBook
  }
}

export const toggleFlagExistInDB = (bookId: string) => {
  return {
    type: googleBookConstant.TOGGLE_FLAG_EXIST_IN_DB,
    payload: bookId
  }
}