import { CategoryAuthor } from "../../models/category-author.model";
import * as filterConstant from "../constants/filterConstant"
import { BookService } from "../../service/books.service";
import { initialAuthState } from './authentificationInfoReducer'

const bookService = new BookService();

const initialState: FilterState = {
  authors: [],
  categories: [],
  title: ''
};

const loadData = () => {
  if (initialAuthState.isLogined) {
    bookService.getAllAuthors()
    .then((authors: CategoryAuthor[]) => {
      initialState.authors = authors.map(author => {
        return {
          ...author,
          checked: false
        }
      })
      bookService.getAllCategories()
      .then((categories: CategoryAuthor[]) => {
        initialState.categories = categories.map((category: CategoryAuthor) => {
          return {
            ...category,
            checked: false
          }
        });
      });
    });
  }
};

loadData();

export function filterReducer(state: FilterState = initialState, action: FilterAction ): FilterState {
  console.log('initialState', initialState);
  
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
    // case filterConstant.REFRESH_FILTER_DATA:
    //   return {...loadData()};
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