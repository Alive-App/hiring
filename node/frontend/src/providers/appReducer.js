/* eslint-disable no-case-declarations */
export default (state, action) => {
  switch (action.type) {
    case 'REMOVE_STOCK':
      const uptatedStock = state.stocks.filter((user) => user.symbol !== action.payload);
      localStorage.setItem('wallet', JSON.stringify(uptatedStock));
      return {
        ...state,
        stocks: uptatedStock,
      };
    case 'ADD_STOKC':
      const newStock = [action.payload, ...state.stocks];
      localStorage.setItem('wallet', JSON.stringify(newStock));
      return {
        ...state,
        stocks: newStock,
      };

    default:
      return state;
  }
};
