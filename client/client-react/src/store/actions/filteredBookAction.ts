import { Book } from "../../models/book.model";
import { SET_BOOK } from "../constants/filteredBookConstant";

export function setBook(listOfBook: Book[]) {
  return {
    type: SET_BOOK,
    payload: listOfBook
  }
}