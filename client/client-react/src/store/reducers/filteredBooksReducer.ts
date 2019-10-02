import { Book } from "../../models/book.model";
import { SET_BOOK, TOGGLE_FAVORITE_FLAG } from "../constants/filteredBookConstant";

export interface FilteredBooksAction {
  type: string;
  payload?: Book[];
}

export interface FilteredBooksState {
  books: Book[];
}

export function filteredBook(state: FilteredBooksState = {books: []} , action: FilteredBooksAction): FilteredBooksState {
  switch(action.type) {
    case SET_BOOK:
      return {
        books: [...action.payload as Book[]]
      }
    case TOGGLE_FAVORITE_FLAG:
        return {
          books: state.books.map(book => {
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