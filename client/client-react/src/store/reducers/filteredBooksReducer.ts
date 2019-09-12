import { Book } from "../../models/book.model";
import { SET_BOOK } from "../constants/filteredBookConstant";

export interface FilteredBooksAction {
  type: string;
  payload?: Book[];
}

export interface FilteredBooksState {
  books: Book[];
}

export function filteredBookReducer(state: FilteredBooksState = {books: []} , action: FilteredBooksAction): FilteredBooksState {
  switch(action.type) {
    case SET_BOOK:
      return {
        books: action.payload as Book[]
      }
    default:
      return state;
  }
}