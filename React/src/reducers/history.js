import { REFRESH_HISTORY, REFRESH_STOCK } from '../actions/types';
const initialState = {
  intraday: {},
  daily: {},
  weekly: {},
  monthly: {},
  stock: {},
};

const historyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REFRESH_HISTORY:
      const { symbol, type, list, metadata } = payload;
      return { ...state, [type]: { ...state[type], [String(symbol).toUpperCase()]: { list, metadata } } };
    case REFRESH_STOCK:
      const { Symbol: s } = payload;
      return { ...state, stock: { ...state.stock, [String(s).toUpperCase()]: payload } };
    default:
      return state;
  }
};

export default historyReducer;
