import store from '../config/store';
import { REFRESH_HISTORY, REFRESH_STOCK } from './types';

const dispatch = store.dispatch;

export const refreshHistory = (payload) => {
  dispatch({ type: REFRESH_HISTORY, payload });
};
export const refreshStock = (data) => {
  dispatch({ type: REFRESH_STOCK, payload: data });
};
