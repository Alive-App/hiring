import { ADD_TO_PORTFOLIO, REMOVE_FROM_PORTFOLIO } from '../actions/types';

const initialState = [];

const portfolioReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_PORTFOLIO:
      return [...state, payload];
    case REMOVE_FROM_PORTFOLIO:
      const newState = [...state];
      newState.splice(payload.index);
      return newState;
    default:
      return state;
  }
};

export default portfolioReducer;
