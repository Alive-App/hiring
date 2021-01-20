import React, { useEffect } from "react";

import {
  TopBar,
  Chart,
  StockDetails,
  Simulation,
  AlertPopup,
} from "../../components";
import { AppStore } from "../../store";
import Api from "../../services/api";
import Utils from "../../services/utils";

import "./styles.sass";

const Home = () => {
  const {
    dateMode,
    previousDateMode,
    symbol,
    selectedStock,
    formattedStockSeries,
    stockInfo,
    initialDate,
    finalDate,
    stockSeries,
    alertMessage,
  } = AppStore.useState((state) => ({
    dateMode: state.dateMode,
    previousDateMode: state.previousDateMode,
    symbol: state.symbol,
    selectedStock: state.selectedStock,
    formattedStockSeries: state.formattedStockSeries,
    stockInfo: state.stockInfo,
    initialDate: state.initialDate,
    finalDate: state.finalDate,
    stockSeries: state.stockSeries,
    alertMessage: state.alertMessage,
  }));

  useEffect(() => {
    const api = new Api();
    const utils = new Utils();

    const setStockSeriesInterval = (stockSeries, initialDate, finalDate) => {
      AppStore.update((state) => {
        state.stockSeries = stockSeries;
      });

      const data = [];
      if (stockSeries) {
        Object.keys(stockSeries).map((key) => {
          const date = key.split(" ")[0];

          initialDate = utils.formatDateString(initialDate);
          finalDate = utils.formatDateString(finalDate);

          if (utils.isBetweenDates(date, initialDate, finalDate)) {
            const dateS = `${date.split("-")[2]}/${date.split("-")[1]}/${
              date.split("-")[0]
            }`;
            data.push([
              dateS,
              parseFloat(stockSeries[key]["4. close"]),
              parseFloat(stockSeries[key]["2. high"]),
              parseFloat(stockSeries[key]["3. low"]),
            ]);
          }

          return key;
        });
      }

      data.push(["Data", "Preço final", "Preço máx.", "Preço mín."]);

      AppStore.update((state) => {
        state.formattedStockSeries = data.reverse();
      });
    };

    const setStockSeries = (stockSeries, limit) => {
      AppStore.update((state) => {
        state.stockSeries = stockSeries;
      });

      const data = [];
      if (stockSeries) {
        let count = 0;
        Object.keys(stockSeries).map((key) => {
          const date = key.split(" ")[0];
          const hour = key.split(" ")[1] ? key.split(" ")[1] : "";

          if (count < limit) {
            const dateS = `${date.split("-")[2]}/${date.split("-")[1]}/${
              date.split("-")[0]
            }${
              hour !== "" ? ` ${hour.split(":")[0]}:${hour.split(":")[1]}` : ""
            }`;
            data.push([
              dateS,
              parseFloat(stockSeries[key]["4. close"]),
              parseFloat(stockSeries[key]["2. high"]),
              parseFloat(stockSeries[key]["3. low"]),
            ]);
            count++;
          }

          return key;
        });
      }

      data.push(["Data", "Preço final", "Preço máx.", "Preço mín."]);

      AppStore.update((state) => {
        state.formattedStockSeries = data.reverse();
      });
    };

    const setStockInfo = (stockInfo) => {
      const updated = stockInfo ? Object.keys(stockInfo)[0] : `N/A`;
      stockInfo = stockInfo ? stockInfo[Object.keys(stockInfo)[0]] : stockInfo;

      AppStore.update((state) => {
        state.stockInfo = { ...stockInfo, updated };
      });
    };

    if (selectedStock) {
      switch (dateMode) {
        case 0:
          if (previousDateMode !== dateMode)
            api.getStockDataInDay(symbol).then((response) => {
              if (response.status === 200) {
                setStockSeries(response.data["Time Series (60min)"], 24);
                setStockInfo(response.data["Time Series (60min)"]);
              } else {
                AppStore.update((state) => {
                  state.alertMessage = response.error;
                });
              }
            });
          break;
        case 1:
          if (previousDateMode !== dateMode)
            api.getStockDataInMonth(symbol).then((response) => {
              if (response.status === 200) {
                setStockSeries(response.data["Time Series (Daily)"], 31);
                setStockInfo(response.data["Time Series (Daily)"]);
              } else {
                AppStore.update((state) => {
                  state.alertMessage = response.error;
                });
              }
            });
          break;
        case 2:
          if (previousDateMode !== dateMode)
            api.getStockDataInYear(symbol).then((response) => {
              if (response.status === 200) {
                setStockSeries(response.data["Monthly Time Series"], 12);
                setStockInfo(response.data["Monthly Time Series"]);
              } else {
                AppStore.update((state) => {
                  state.alertMessage = response.error;
                });
              }
            });
          break;
        case 3:
          if (previousDateMode !== dateMode)
            api.getAllStockData(symbol).then((response) => {
              if (response.status === 200) {
                setStockSeriesInterval(
                  response.data["Time Series (Daily)"],
                  initialDate,
                  finalDate
                );
              } else {
                AppStore.update((state) => {
                  state.alertMessage = response.error;
                });
              }
            });
          else setStockSeriesInterval(stockSeries, initialDate, finalDate);

          break;
        default:
          break;
      }
    }
  }, [
    selectedStock,
    dateMode,
    finalDate,
    initialDate,
    previousDateMode,
    stockSeries,
    symbol,
  ]);

  return (
    <div className="home">
      <TopBar />
      <AlertPopup
        message={alertMessage}
        toggle={(active) => {
          if (!active) {
            AppStore.update((state) => {
              state.alertMessage = "";
            });
          }
        }}
      />
      <main>
        <Chart
          selectedStock={selectedStock ? selectedStock : {}}
          formattedStockSeries={formattedStockSeries}
        />
        <StockDetails stockInfo={stockInfo} />
      </main>
      <Simulation />
    </div>
  );
};

export default Home;
