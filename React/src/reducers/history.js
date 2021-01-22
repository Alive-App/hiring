import { REFRESH_HISTORY } from '../actions/types';
const initialState = {
  intraday: {},
  daily: {},
  weekly: {},
  monthly: {},
};

const historyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REFRESH_HISTORY:
      const { symbol, type, list, metadata } = payload;
      return { ...state, [type]: { ...state[type], [symbol]: { list, metadata } } };
    default:
      return state;
  }
};

export default historyReducer;

/*
export interface MainReducer{

} */
