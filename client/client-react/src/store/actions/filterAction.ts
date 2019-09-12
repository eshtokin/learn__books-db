import { CategoryAuthor } from "../../models/category-author.model"
import { SET_TITLE, SET_CATEGORY, SET_AUTHOR, SET_FILTER } from "../constants/filterConstant"
import { FilterState } from "../reducers/filterReducer"

export function setTitle(title: string) {
  return {
    type: SET_TITLE,
    payload: title
  }
}
export function setCategories(categories: CategoryAuthor[]) {
  return {
    type: SET_CATEGORY,
    payload: categories
  }
}

export function setAuthor(authors: CategoryAuthor[]) {
  return {
    type: SET_AUTHOR,
    payload: authors
  }
}

export function setFilter(data: FilterState) {
  return {
    type: SET_FILTER,
    payload: data
  }
}