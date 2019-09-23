import { createStore, combineReducers } from 'redux';
import { bookManagerReducer, BookManagerStore } from './../reducers/bookManagerReducer';
import { userManagerReducer, UserManagerStore } from './../reducers/userManagerReducer';
import { filterReducer, FilterState} from './../reducers/filterReducer';
import { filteredBookReducer, FilteredBooksState} from './../reducers/filteredBooksReducer';
import { authentificatedInfoReducer, AuthentificationState } from './../reducers/authentificationInfoReducer';
import { googleBookReducer, GoogleBookState } from './../reducers/googleBookReducer';

const initialState = combineReducers({
  bookManagerReducer,
  userManagerReducer,
  filteredBookReducer,
  filterReducer,
  authentificatedInfoReducer,
  googleBookReducer
})

export interface Store {
  bookManagerReducer: BookManagerStore;
  userManagerReducer: UserManagerStore;
  filteredBookReducer: FilteredBooksState;
  filterReducer: FilterState;
  authentificatedInfoReducer: AuthentificationState;
  googleBookReducer: GoogleBookState;
}

export const store = createStore(initialState);
