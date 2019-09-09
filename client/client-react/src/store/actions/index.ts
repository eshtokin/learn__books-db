import { ADD_ARTICLE } from "../constants/index";

export const  addArticle = (text: string) => {
  return {
    type: ADD_ARTICLE,
    payload: text
  }
}