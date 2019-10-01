import * as googleBookConstant from './../constants/googleBookConstant';
import { Book } from '../../models/book.model';

export interface GoogleBookState {
  listOfBook: Book[]
}

export interface GoogleBookAction {
  type: string;
  payload: Book[] | string;
}

export function googleBook(state: GoogleBookState = { listOfBook: []}, action: GoogleBookAction): GoogleBookState {
  switch(action.type) {
    case googleBookConstant.SET_LIST_OF_BOOK:
      return {
        listOfBook: action.payload as Book[]
      }
    case googleBookConstant.TOGGLE_FLAG_EXIST_IN_DB:
      return {
        listOfBook: state.listOfBook.map(book => {
          return {
            ...book,
            alreadyExistInBD: book._id === (action.payload as string)
            ? !book.alreadyExistInBD
            : book.alreadyExistInBD
          }
        })
      }
    default:
      return state;
  }
}