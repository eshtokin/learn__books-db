import { ADD_ARTICLE } from "../constants/index";

const initialState: {articles: string[]} = {
  articles: []
};

function rootReducer(state = initialState, action: {type: string, payload: string}) {
  if (action.type === ADD_ARTICLE) {
    return {
      ...state,
      articles: state.articles.push(action.payload)
    };
  }
  return state;
}
