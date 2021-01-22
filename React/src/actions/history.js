import store from '../config/store';
import { ADD_TO_PORTFOLIO, REFRESH_HISTORY } from './types';

const dispatch = store.dispatch;
const getState = store.getState;

export const refreshHistory = ({ metadata = {}, list = [], symbol, type }) => {
  dispatch({ type: REFRESH_HISTORY, payload: { metadata, list, symbol, type } });
};
