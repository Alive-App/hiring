const axios = require("axios");

const connection = axios.create({
  baseURL: "https://www.alphavantage.co/",
});

module.exports = connection;
