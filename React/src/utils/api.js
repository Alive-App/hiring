import React from 'react';
import alphavantage from 'alphavantage';
import Toaster from './toaster';
import { refreshHistory, refreshStock } from '../actions/history';
import { parseISO } from 'date-fns';

const key = '7QGBL6ZJU67O7EPP';
export const av = alphavantage({ key });

/**
 *|api hook
 * @param {('daily'|'weekly'|'monthly'|'search'|'company_overview')} _fn função de retorno
 * @param {('data'|'fundamental')} [_type='data'] tipo de função de retorno
 */
export const useAPI = (_fn = '', _type = 'data') => {
  const [state, setState] = React.useState({ error: null, data: null, loading: false });

  /**
   *
   * @param {object} options
   * @param {string} [options.fn= _fn]
   * @param {string} [options.type= _type]
   * @param {any[]} options.params
   */
  const fetchData = async (options = {}) => {
    const { fn = _fn, type = _type, params = [] } = options;
    try {
      setState((old) => ({ ...old, error: false, loading: true }));

      let result = await av[type][fn](...params);
      result = polData(fn, result);
      setState((old) => ({ ...old, data: result, loading: false }));
      return result;
    } catch (err) {
      const error = handleError(err);
      setState((old) => ({ ...old, error, loading: false }));
    }
  };
  return [state, fetchData];
};

const handleError = (error) => {
  let msg = 'Ops... não foi possível realizar sua consulta';
  if (String(error).includes('Note')) {
    msg = 'Calma aê campeão... Você só pode fazer 5 consultas por minuto';
  }
  Toaster.show({ detail: msg, severity: 'error' });
  return msg;
};

const polData = (type, data) => {
  switch (type) {
    case 'company_overview':
      refreshStock(data);
      break;
    case 'search':
      let { bestMatches } = data;
      data = bestMatches.map((data) => av.util.polish(data));
      break;
    default:
      //daily weekly monthly
      let [metadata, list = []] = Object.keys(data);
      metadata = av.util.polish(data[metadata]);
      list = data[list];

      let newData = { metadata, list: [] };
      newData.list = [
        ...Object.entries(list).map(([key, d]) => {
          const { close, high, low, open } = av.util.polish(d);
          return [parseISO(key), parseFloat(close), parseFloat(high), parseFloat(low), parseFloat(open)];
        }),
      ].reverse();
      newData.list.unshift(['x', 'Preço', 'Alta', 'Baixa', 'Abertura']);
      refreshHistory({ symbol: metadata.symbol, type, ...newData });
      return newData;
  }

  return data;
};
