import { CategoryAuthor } from "../../models/category-author.model";
import * as filterConstant from "../constants/filterConstant"

export interface FilterState {
  categories?: CategoryAuthor[];
  authors?: CategoryAuthor[];
  title?: string;
}

export interface FilterAction {
  type: string;
  payload: string | CategoryAuthor | CategoryAuthor[] | FilterState;
}

const initialState: FilterState = {
  authors: [],
  categories: [],
  title: ''
};

export function filterReducer(state: FilterState = initialState, action: FilterAction ): FilterState {  
  switch(action.type) {
    case filterConstant.SET_TITLE:
      return {
        title: action.payload as string
      };
    case filterConstant.SET_CATEGORY:
      return {
        categories: action.payload as CategoryAuthor[]
      }
    case filterConstant.SET_AUTHOR:
      return {
        authors: action.payload as CategoryAuthor[]
      }
    case filterConstant.SET_FILTER:
      return action.payload as FilterState
    default:
      return state;
  }
}