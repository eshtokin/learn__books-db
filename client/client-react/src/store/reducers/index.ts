import { ADD_ARTICLE } from './../constants/index'
import { combineReducers } from 'redux';

interface stateArticles {
  articles: string[];
}

interface stateName {
  name: string;
}

interface action {
  type: string;
  payload: string;
}

function articlesReducer(state = {articles: ['first']}, action: action): stateArticles {
  switch(action.type) {
    case ADD_ARTICLE:
      return {
        articles: (state.articles as string[]).push(action.payload),
        ...state
      }
  }
  
  return state;
};

function nameReducer(state = {name: 'tada'}, action: action): stateName {
  switch(action.type) {
    case 'SET_NAME':
      return {
        name: action.payload
      }
  }
  
  return state;
}

const initialState = combineReducers({articlesReducer, nameReducer})

export default initialState;