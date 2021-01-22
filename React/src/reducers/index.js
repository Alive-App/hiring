import { combineReducers } from 'redux';

import historyReducer from './history';
import portfolioReducer from './portfolio';

export default combineReducers({ history: historyReducer, portfolio: portfolioReducer });
