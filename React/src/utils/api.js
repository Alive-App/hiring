import { useState } from 'react';
import axios, { Method } from 'axios';
import handleErrors from './handleErrors';
import parser from 'query-string-parser';
import alphavantage from 'alphavantage';
export const API_URL = 'https://alphavantage.co/query';
const key = '7QGBL6ZJU67O7EPP';
/* const isDebuggingEnabled = typeof atob !== 'undefined'; */

export const av = alphavantage({ key });

const DEFAULT_TIMEOUT = 15000;
const initialState = { success: null, msg: 'carregando...' };
/** API Hook
 * @param {object}  options options
 * @param {'TIME_SERIES_INTRADAY' | 'TIME_SERIES_DAILY' | 'TIME_SERIES_WEEKLY' | 'TIME_SERIES_MONTHLY' | 'SYMBOL_SEARCH'}  options.resource options
 * @param {Method} options.method
 * @param {any} options.params
 * @param {(error: any) => any}  options.onError
 * @param {string} options.url
 * @param {number} options.timeout

 */
export const useAPI = (
  {
    resource: hookResource,
    method: hookMethod = 'GET',
    params: hookParams = {},
    onError: onErrorAPI = handleErrors,
    url: hookUrl = API_URL,
    timeout: hookTimeout = DEFAULT_TIMEOUT,
    body: hookBody,
  } /* : APIHook */,
) => {
  const [respData, setData] = useState(initialState);

  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  function fetchData({
    resource = hookResource,
    timeout = hookTimeout,
    onError = onErrorAPI,
    body = hookBody,
    url = hookUrl,
    query = hookParams,
    method = hookMethod,
  } = {}) {
    return new Promise(async (resolve) => {
      const q = { ...query };
      const source = axios.CancelToken.source();

      url += '?' + parser.toQuery({ ...q, function: resource, apikey: key });

      setError(false);
      setLoading(true);
      try {
        const options = {
          cancelToken: source.token,
          timeout,
          method,
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            crossDomain: true,
            'Content-Type': 'text/plain;charset=utf-8',
          },
        };
        if (method != 'GET') options.data = body;

        const { result } = await axios(url, options);
        // const result = av['data'].search;
        setLoading(false);

        if (!!result.data['Error Message']) {
          setError(true);
          onError(result.data);
        }
        setData({ ...initialState, ...result.data });
        resolve(result.data);
      } catch (err) {
        setLoading(false);
        setError(true);
        if (err.message && err.message == 'cancel') return;
      }
      setLoading(false);
    });
  }

  return [{ loading, data: respData, isError }, fetchData];
};
