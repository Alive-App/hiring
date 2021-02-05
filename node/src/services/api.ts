import axios from "axios";

const api = axios.create({
  baseURL: `https://www.alphavantage.co/`,
});

export default api;
