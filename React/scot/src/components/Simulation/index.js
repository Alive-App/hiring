import React from "react";

import Utils from "../../services/utils";
import Api from "../../services/api";
import { useForm } from "../../hooks";
import { AppStore } from "../../store";
import { Input, Button } from "../index";

import "./styles.sass";

const Simulation = () => {
  const api = new Api();
  const utils = new Utils();

  const {
    simulationStockSeries,
    symbol,
    amount,
    buyDate,
    sellDate,
    selectedStock,
    result,
  } = AppStore.useState((state) => ({
    simulationStockSeries: state.simulationStockSeries,
    amount: state.amount,
    buyDate: state.buyDate,
    sellDate: state.sellDate,
    symbol: state.symbol,
    selectedStock: state.selectedStock,
    result: state.result,
  }));
  const [handleChange] = useForm();

  const getPriceAtDate = (series, date) => {
    let closestDate = Object.keys(series).sort((a, b) => {
      a = utils.parseDate(a);
      b = utils.parseDate(b);
      let diff = utils.parseDate(date);

      let distanceA = Math.abs(diff - a);
      let distanceB = Math.abs(diff - b);

      return distanceA - distanceB;
    })[0];

    return parseFloat(series[closestDate]["4. close"]);
  };

  return (
    <div className="simulation">
      <h3 className="title">Simulação</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!simulationStockSeries && selectedStock) {
            api.getAllStockData(symbol).then((response) => {
              if (response.status === 200) {
                let buyPrice = getPriceAtDate(
                  response.data["Time Series (Daily)"],
                  buyDate
                );

                let sellPrice = getPriceAtDate(
                  response.data["Time Series (Daily)"],
                  sellDate
                );

                let profit = sellPrice * amount - buyPrice * amount;
                AppStore.update((state) => {
                  state.result = profit;
                });
              } else {
                AppStore.update((state) => {
                  state.alertMessage = response.error;
                });
              }
            });
          }
        }}
      >
        <Input
          type="text"
          placeholder="Qntd. de cotas"
          name="amount"
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          placeholder="Data de entrada"
          name="buyDate"
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          placeholder="Data de saída"
          name="sellDate"
          onChange={handleChange}
          required
        />
        <Button type="submit">Simular</Button>
      </form>
      {result ? (
        <div className="row">
          <span>Retorno</span>
          <span
            className={`result result--${
              result >= 0 ? "positive" : "negative"
            }`}
          >
            {`${result >= 0 ? "+ " : "- "}`} US$ {result.toFixed(2)}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default Simulation;
