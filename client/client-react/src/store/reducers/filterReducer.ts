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

export function filter(state: FilterState = initialState, action: FilterAction ): FilterState {  
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

    case filterConstant.SET_ALL_FLAG:
      const newState = {
        authors: (state.authors as CategoryAuthor[]).map(author => {
          return {
            ...author,
            checked: action.payload as boolean
          }
        }),
        categories: (state.categories as CategoryAuthor[]).map(category => {
          return {
            ...category,
            checked: action.payload as boolean
          }
        }),
        title: state.title
      }
      return newState;
    default:
      return state;
  }
}