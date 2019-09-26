import { CategoryAuthor } from "../../models/category-author.model"
import * as filterConstant from "../constants/filterConstant"
import { FilterState } from "../reducers/filterReducer"

export function setTitle(title: string) {
  return {
    type: filterConstant.SET_TITLE,
    payload: title
  }
}
export function setCategories(categories: CategoryAuthor[]) {
  return {
    type: filterConstant.SET_CATEGORY,
    payload: categories
  }
}

export function setAuthor(authors: CategoryAuthor[]) {
  return {
    type: filterConstant.SET_AUTHOR,
    payload: authors
  }
}

export function setFilter(data: FilterState) {
  return {
    type: filterConstant.SET_FILTER,
    payload: data
  }
}

export function refreshFilterData() {
  return {
    type: filterConstant.REFRESH_FILTER_DATA,
    payload: ''
  }
}