import { combineReducers } from 'redux';

import mainReducer, { MainReducer } from './main';

export default combineReducers({ main: mainReducer });

export interface StoreState {
	main: MainReducer;
}
