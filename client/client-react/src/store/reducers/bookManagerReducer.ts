import { Book } from '../../models/book.model';
import { SET_BOOK_AT_PAGE, DELETE_BOOK, TOGGLE_FAVORITE_FLAG } from '../constants/bookManagerConstant';

export interface BookReducerAction {
  type: string;
  payload: Book[] | string;
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
    case DELETE_BOOK:
      return {
        bookAtPage: state.bookAtPage.filter((book) => {
          return book._id !== action.payload;
        })
      }
    case TOGGLE_FAVORITE_FLAG:
      return {
        bookAtPage: state.bookAtPage.map(book => {
          return {
            ...book,
            inFavorite: book._id === action.payload
            ? !book.inFavorite
            : book.inFavorite
          }
        })
      }
    default:
      return state;
  }
}