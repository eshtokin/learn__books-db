import { CategoryAuthor } from "../../models/category-author.model";
import { SET_TITLE, SET_CATEGORY, SET_AUTHOR, SET_FILTER } from "../constants/filterConstant"

const initialState: FilterState = {
  authors: [],
  categories: [],
  title: ''
}

export function filterReducer(state: FilterState = initialState, action: FilterAction ): FilterState {
  switch(action.type) {
    case SET_TITLE:
      return {
        title: action.payload as string
      };
    case SET_CATEGORY:
      return {
        categories: action.payload as CategoryAuthor[]
      }
    case SET_AUTHOR:
      return {
        authors: action.payload as CategoryAuthor[]
      }
    case SET_FILTER:
      return action.payload as FilterState
    default:
      return state;
  }
}

export interface FilterState {
  categories?: CategoryAuthor[];
  authors?: CategoryAuthor[];
  title?: string;
}

export interface FilterAction {
  type: string;
  payload: string | CategoryAuthor | CategoryAuthor[] | FilterState;
}
