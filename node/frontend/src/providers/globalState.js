/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';
import AppReducer from './appReducer';

const wallet = JSON.parse(localStorage.getItem('wallet'));

const initialState = {
  stocks: wallet || [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const removeStock = (symbol) => {
    dispatch({
      type: 'REMOVE_STOCK',
      payload: symbol,
    });
  };

  const addStock = (stcok) => {
    dispatch({
      type: 'ADD_STOKC',
      payload: stcok,
    });
  };

  return (
    <GlobalContext.Provider value={{
      stocks: state.stocks,
      removeStock,
      addStock,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
