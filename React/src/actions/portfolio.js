import store from '../config/store';
import { ADD_TO_PORTFOLIO } from './types';

const dispatch = store.dispatch;
const getState = store.getState;

export const addToPortfolio = (payload) => {
  dispatch({ type: ADD_TO_PORTFOLIO, payload });
};
export const addFromPortfolio = (payload) => {
  dispatch({ type: ADD_TO_PORTFOLIO, payload });
};
