import axios from 'axios';

const api = axios.create({
  baseURL: 'https://melquias-stocks.herokuapp.com/',
});

export default api;
