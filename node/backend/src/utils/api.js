const axios = require('axios');

const api = axios.create({
  baseURL: 'https://www.alphavantage.co',
});

module.exports = api;
