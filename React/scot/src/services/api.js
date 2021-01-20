import axios from "axios";
const API_KEY = "BUIQG69NM4GGY34Y";
const URL = "https://www.alphavantage.co/query";

export default class Api {
  searchStocks(keywords) {
    const FUNCTION = "SYMBOL_SEARCH";

    const requestUrl = `${URL}?function=${FUNCTION}&keywords=${keywords}&apikey=${API_KEY}`;
    return axios.get(requestUrl).then((response) => {
      if (response.status === 200) {
        if (response.data["Note"]) {
          response.status = 500;
          response.error =
            "Limite de requisições atingidas. Você tem 5 requisições por minuto.";
        }
      }

      return response;
    });
  }

  getStockDataInDay(symbol) {
    const FUNCTION = "TIME_SERIES_INTRADAY";
    const INTERVAL = "60min";

    const requestUrl = `${URL}?function=${FUNCTION}&symbol=${symbol}&interval=${INTERVAL}&apikey=${API_KEY}`;
    return axios.get(requestUrl).then((response) => {
      if (response.status === 200) {
        if (response.data["Note"]) {
          response.status = 500;
          response.error =
            "Limite de requisições atingidas. Você tem 5 requisições por minuto.";
        }
      }
      return response;
    });
  }

  getStockDataInMonth(symbol) {
    const FUNCTION = "TIME_SERIES_DAILY";

    const requestUrl = `${URL}?function=${FUNCTION}&symbol=${symbol}&apikey=${API_KEY}`;
    return axios.get(requestUrl).then((response) => {
      if (response.status === 200) {
        if (response.data["Note"]) {
          response.status = 500;
          response.error =
            "Limite de requisições atingidas. Você tem 5 requisições por minuto.";
        }
      }
      return response;
    });
  }

  getStockDataInYear(symbol) {
    const FUNCTION = "TIME_SERIES_MONTHLY";

    const requestUrl = `${URL}?function=${FUNCTION}&symbol=${symbol}&apikey=${API_KEY}`;
    return axios.get(requestUrl).then((response) => {
      if (response.status === 200) {
        if (response.data["Note"]) {
          response.status = 500;
          response.error =
            "Limite de requisições atingidas. Você tem 5 requisições por minuto.";
        }
      }
      return response;
    });
  }

  getStockDataInfo(symbol) {
    const FUNCTION = "GLOBAL_QUOTE";

    const requestUrl = `${URL}?function=${FUNCTION}&symbol=${symbol}&apikey=${API_KEY}`;
    return axios.get(requestUrl).then((response) => {
      if (response.status === 200) {
        if (response.data["Note"]) {
          response.status = 500;
          response.error =
            "Limite de requisições atingidas. Você tem 5 requisições por minuto.";
        }
      }
      return response;
    });
  }

  getAllStockData(symbol) {
    const FUNCTION = "TIME_SERIES_DAILY";
    const OUTPUT = "full";

    const requestUrl = `${URL}?function=${FUNCTION}&symbol=${symbol}&outputsize=${OUTPUT}&apikey=${API_KEY}`;
    return axios.get(requestUrl).then((response) => {
      if (response.status === 200) {
        if (response.data["Note"]) {
          response.status = 500;
          response.error =
            "Limite de requisições atingidas. Você tem 5 requisições por minuto.";
        }
      }
      return response;
    });
  }
}
