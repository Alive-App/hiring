import { ADD_TO_PORTFOLIO, REMOVE_FROM_PORTFOLIO } from '../actions/types';

const initialState = [];

const portfolioReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_PORTFOLIO:
      return [...state, payload];
    case REMOVE_FROM_PORTFOLIO:
      const newState = [...state];
      return newState.filter(({ Symbol: s }) => String(s).toLowerCase() != String(payload.Symbol).toLowerCase());
    default:
      return state;
  }
};

export default portfolioReducer;
