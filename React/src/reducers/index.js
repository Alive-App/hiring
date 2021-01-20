import { combineReducers } from 'redux';

import mainReducer from './main';
import portfolioReducer from './portfolio';

export default combineReducers({ main: mainReducer, portfolio: portfolioReducer });
