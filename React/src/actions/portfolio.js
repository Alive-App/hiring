import store from '../config/store';
import { ADD_TO_PORTFOLIO, REMOVE_FROM_PORTFOLIO } from './types';

const dispatch = store.dispatch;

export const addToPortfolio = (payload) => {
  dispatch({ type: ADD_TO_PORTFOLIO, payload });
};
export const removeFromPortfolio = (payload) => {
  dispatch({ type: REMOVE_FROM_PORTFOLIO, payload });
};
