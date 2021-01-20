import React from "react";
import App from "./App";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import { AppStore } from "./store";
import Api from "./services/api";

library.add(faSearch, faTimes);

it("should render the homepage initially", () => {
  const app = mount(<App />);
  expect(toJson(app)).toMatchSnapshot();
});

it("should render the chart with symbol (IBM) setted", async () => {
  const app = mount(<App />);

  act(() => {
    AppStore.update((state) => {
      state.symbolFound = true;
      state.symbol = "IBM";
      state.selectedStock = {
        "1. symbol": "IBM",
        "2. name": "International Business Machines Corp",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-05",
        "8. currency": "USD",
        "9. matchScore": "1.0000",
      };
      state.searchResult = [];
    });
  });

  expect(toJson(app)).toMatchSnapshot();
});

it("should render Chart Monthly view", async () => {
  const app = mount(<App />);

  act(() => {
    AppStore.update((state) => {
      state.symbolFound = true;
      state.symbol = "IBM";
      state.selectedStock = {
        "1. symbol": "IBM",
        "2. name": "International Business Machines Corp",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-05",
        "8. currency": "USD",
        "9. matchScore": "1.0000",
      };
      state.searchResult = [];

      state.previousDateMode = state.dateMode;
      state.dateMode = 1;
    });
  });

  expect(toJson(app)).toMatchSnapshot();
});

it("should render Chart Year view", async () => {
  const app = mount(<App />);

  act(() => {
    AppStore.update((state) => {
      state.symbolFound = true;
      state.symbol = "IBM";
      state.selectedStock = {
        "1. symbol": "IBM",
        "2. name": "International Business Machines Corp",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-05",
        "8. currency": "USD",
        "9. matchScore": "1.0000",
      };
      state.searchResult = [];

      state.previousDateMode = state.dateMode;
      state.dateMode = 2;
    });
  });

  expect(toJson(app)).toMatchSnapshot();
});

it("should render Chart Custom Date view (from jan, 01, 2021 to jan, 20, 2021)", async () => {
  const app = mount(<App />);

  act(() => {
    AppStore.update((state) => {
      state.symbolFound = true;
      state.symbol = "IBM";
      state.selectedStock = {
        "1. symbol": "IBM",
        "2. name": "International Business Machines Corp",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-05",
        "8. currency": "USD",
        "9. matchScore": "1.0000",
      };
      state.searchResult = [];

      state.previousDateMode = state.dateMode;
      state.dateMode = 3;
      state.initialDate = "2021-01-01";
      state.finalDate = "2021-01-20";
    });
  });

  expect(toJson(app)).toMatchSnapshot();
});

it("should render simulation with 10 stocks of IBM from jan, 01, 2021 to jan, 20, 2021", async () => {
  const app = mount(<App />);

  const api = new Api();

  const getPriceAtDate = (series, date) => {
    let closestDate = Object.keys(series).sort((a, b) => {
      const yearA = parseInt(a.split("-")[0]);
      const monthA = parseInt(a.split("-")[1]);
      const dayA = parseInt(a.split("-")[2]);

      const yearB = parseInt(b.split("-")[0]);
      const monthB = parseInt(b.split("-")[1]);
      const dayB = parseInt(b.split("-")[2]);

      const yearDiff = parseInt(date.split("-")[0]);
      const monthDiff = parseInt(date.split("-")[1]);
      const dayDiff = parseInt(date.split("-")[2]);

      a = new Date(yearA, monthA - 1, dayA);
      b = new Date(yearB, monthB - 1, dayB);
      let diff = new Date(yearDiff, monthDiff - 1, dayDiff);

      let distanceA = Math.abs(diff - a);
      let distanceB = Math.abs(diff - b);

      return distanceA - distanceB;
    })[0];

    return parseFloat(series[closestDate]["4. close"]);
  };

  act(() => {
    AppStore.update((state) => {
      state.symbolFound = true;
      state.symbol = "IBM";
      state.selectedStock = {
        "1. symbol": "IBM",
        "2. name": "International Business Machines Corp",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-05",
        "8. currency": "USD",
        "9. matchScore": "1.0000",
      };
      state.searchResult = [];

      state.previousDateMode = state.dateMode;
      state.dateMode = 3;
      state.amount = 10;
      state.buyDate = "2021-01-01";
      state.sellDate = "2021-01-20";
    });

    api.getAllStockData("IBM").then((response) => {
      if (response.status === 200) {
        let buyPrice = getPriceAtDate(
          response.data["Time Series (Daily)"],
          "2021-01-01"
        );

        let sellPrice = getPriceAtDate(
          response.data["Time Series (Daily)"],
          "2021-01-20"
        );

        let profit = sellPrice * 10 - buyPrice * 10;
        AppStore.update((state) => {
          state.result = profit;
        });
      } else {
        AppStore.update((state) => {
          state.alertMessage = response.error;
        });
      }
    });
  });

  expect(toJson(app)).toMatchSnapshot();
});
