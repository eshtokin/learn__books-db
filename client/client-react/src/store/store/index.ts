import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { bookManager, BookManagerStore } from './../reducers/bookManagerReducer';
import { userManager, UserManagerStore } from './../reducers/userManagerReducer';
import { filter, FilterState } from './../reducers/filterReducer';
import { filteredBook, FilteredBooksState } from './../reducers/filteredBooksReducer';
import { authentificatedInfo, AuthentificationState } from './../reducers/authentificationInfoReducer';
import { googleBook, GoogleBookState } from './../reducers/googleBookReducer';
import { error , ErrorState } from '../reducers/errorReduser';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface Store {
  bookManager: BookManagerStore;
  userManager: UserManagerStore;
  filteredBook: FilteredBooksState;
  filter: FilterState;
  authentificatedInfo: AuthentificationState;
  googleBook: GoogleBookState;
  error: ErrorState;
};

const initialState = combineReducers<Store>({
  bookManager,
  userManager,
  filteredBook,
  filter,
  authentificatedInfo,
  googleBook,
  error,
})

export const store = createStore(initialState, composeEnhancers(
  applyMiddleware(thunk)
));
