import * as googleBookConstant from './../constants/googleBookConstant';
import { Book } from '../../models/book.model';

export const setListOfBook = (listOfBook: Book[]) => {
  return {
    type: googleBookConstant.SET_LIST_OF_BOOK,
    payload: listOfBook
  }
}