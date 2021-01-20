import { Store } from "pullstate";

export const AppStore = new Store({
  dateMode: 0,
  previousDateMode: -1,
  symbol: "",
  symbolFound: false,
  selectedStock: null,
  stockInfo: null,
  searchResult: [],
  stockSeries: null,
  simulationStockSeries: null,
  formattedStockSeries: [],
  // date
  initialDate: null,
  finalDate: null,
  // simulation
  amount: 0,
  buyDate: null,
  sellDate: null,
  result: 0,
  hasSimulated: false,
  // alert
  alertMessage: "",
});
