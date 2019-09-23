import * as googleBookConstant from './../constants/googleBookConstant';
import { Book } from '../../models/book.model';

export interface GoogleBookState {
  listOfBook: Book[]
}

export interface GoogleBookAction {
  type: string;
  payload: Book[];
}

export function googleBookReducer(state: GoogleBookState = { listOfBook: []}, action: GoogleBookAction): GoogleBookState {
  switch(action.type) {
    case googleBookConstant.SET_LIST_OF_BOOK:
      return {
        listOfBook: action.payload
      }
    default:
      return state;
  }
}