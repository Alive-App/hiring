const axios = require('axios');

/*
  Cria uma instancia do Axios, definindo a url base para conexão. 
*/
const api = axios.create({
  baseURL: `https://www.alphavantage.co/`,
});
api.defaults.timeout = 10000;

module.exports = api;