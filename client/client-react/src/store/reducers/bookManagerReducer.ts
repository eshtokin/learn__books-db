import { Book } from '../../models/book.model';
import { SET_BOOK_AT_PAGE } from '../constants/bookManagerConstant';

export interface BookReducerAction {
  type: string;
  payload: Book[];
}

export interface BookManagerStore {
  bookAtPage: Book[]
}


export function bookManagerReducer(state: BookManagerStore = {bookAtPage: []}, action: BookReducerAction): BookManagerStore {
  switch(action.type) {
    case SET_BOOK_AT_PAGE:
      return {
        bookAtPage: action.payload as Book[]
      }
    default:
      return state;
  }
}