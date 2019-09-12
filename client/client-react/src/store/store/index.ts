import { createStore, combineReducers } from 'redux';
import { bookManagerReducer, BookManagerStore } from './../reducers/bookManagerReducer';
import { userManagerReducer, UserManagerStore } from './../reducers/userManagerReducer';
import { filterReducer, FilterState} from './../reducers/filterReducer';
import { filteredBookReducer, FilteredBooksState} from './../reducers/filteredBooksReducer';


const initialState = combineReducers({bookManagerReducer, userManagerReducer, filteredBookReducer, filterReducer})

export interface Store {
  bookManagerReducer: BookManagerStore;
  userManagerReducer: UserManagerStore;
  filteredBookReducer: FilteredBooksState;
  filterReducer: FilterState;
}

export const store = createStore(initialState);
