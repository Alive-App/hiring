import { useState } from 'react';
import axios from 'axios';
import { handleApiErrors } from './handleErrors';
import parser from 'query-string-parser';

const prod_endpoint = 'https://api.ieatbrazilianmarket.com';
const dev_endpoint = 'http://localhost';

export const API_URL = window.location.hostname.includes('localhost') ? dev_endpoint : prod_endpoint;

/* const isDebuggingEnabled = typeof atob !== 'undefined'; */
/**
 * Flag que indica se há conexão com a internet ativa
 */
const DEFAULT_TIMEOUT = 15000;
const initialState = { success: null, msg: 'carregando...' };

export const useAPI = ({
	resource: apiResource,
	method: apiMethod = 'GET',
	onDownloadProgress,
	onUploadProgress,
	id: idAPI,
	query: apiQuery = {},
	headers = {},
	onError: onErrorAPI = handleApiErrors,
	subResource = null,
	sort: apiSort = [],

	timeout: timeoutAPI = DEFAULT_TIMEOUT,
}) => {
	const [respData, setData] = useState(initialState);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	function fetchData({
		resource = apiResource,

		timeout = timeoutAPI,
		id = idAPI,
		onError = onErrorAPI,

		body: data = {},
		query = apiQuery,
		sort = apiSort,
		method = apiMethod,
	
	} = {}) {
		return new Promise(async resolve => {
			const newQuery = { ...query };
			const source = axios.CancelToken.source();
			let secondPart = '';
			let thirdPart = '';
			let lastPart = '';
	

			switch (method) {
				case 'GET':
				
					if (id) thirdPart = `/${id}`;
				default:
					if (subResource) secondPart = `/${subResource}`;
			}

			if (sort.length) newQuery.sort = sort.map(({ id, desc }) => [id, desc ? 'DESC' : 'ASC']);
			if (Object.keys(newQuery).length) {
				lastPart = '?' + parser.toQuery(newQuery);
			}
			let url = `${API_URL}/${resource}${secondPart}${thirdPart}${lastPart}`;
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await axios(url, {
					onDownloadProgress,
					onUploadProgress,
					data: method != 'GET' ? data : null,
					cancelToken: source.token,
					timeout,
					method,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						...headers,
					},
				});

				setIsLoading(false);

				if (result.data.success) {
					setData({ ...initialState, ...result.data });
					resolve(result.data);
				} else {
					setIsError(true);
					onError(result.data);
				}
			} catch (error) {
				setIsLoading(false);
				setIsError(true);
				if (error.message && error.message == 'cancel') return;
			}
			setIsLoading(false);
		});
	}

	return [{ isLoading, data: respData, isError }, fetchData];
};
