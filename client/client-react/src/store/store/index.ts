import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { bookManager } from './../reducers/bookManagerReducer';
import { userManager } from './../reducers/userManagerReducer';
import { filter } from './../reducers/filterReducer';
import { filteredBook } from './../reducers/filteredBooksReducer';
import { authentificatedInfo } from './../reducers/authentificationInfoReducer';
import { googleBook } from './../reducers/googleBookReducer';

import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = combineReducers({
  bookManager,
  userManager,
  filteredBook,
  filter,
  authentificatedInfo,
  googleBook
})

export const store = createStore(initialState, composeEnhancers(
  applyMiddleware(thunk)
));
