import React from "react";
import { Chart as GoogleChart } from "react-google-charts";

import { useForm } from "../../hooks";
import { AppStore } from "../../store";
import { Input, Button } from "../index";

import "./styles.sass";

const Chart = ({ selectedStock, formattedStockSeries }) => {
  const dateMode = AppStore.useState((state) => state.dateMode);
  const [handleChange] = useForm();

  let title =
    dateMode === 0
      ? `(Últimas 24 horas)`
      : dateMode === 1
      ? `(Últimos 30 dias)`
      : `(Últimos 12 meses)`;
  title = `${selectedStock["2. name"]} ${title}`;

  return (
    <div className="chart">
      <div className="top-info">
        <h1 className="symbol">
          {selectedStock["1. symbol"]
            ? selectedStock["1. symbol"]
            : `Nenhuma empresa selecionada`}
        </h1>
        <span className="name">{selectedStock["2. name"]}</span>
      </div>
      <div className="graphic">
        <GoogleChart
          width={"100%"}
          height={"300px"}
          chartType="AreaChart"
          data={formattedStockSeries}
          options={{
            title,
            hAxis: {
              title: "Data",
            },
            vAxis: {
              title: "Preço (US$)",
            },
          }}
        />
      </div>
      <div className="date-customer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            AppStore.update((state) => {
              state.previousDateMode = state.dateMode;
              state.dateMode = 3;
            });
          }}
        >
          <Input
            type="date"
            placeholder="Data de início"
            name="initialDate"
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            placeholder="Data de fim"
            name="finalDate"
            onChange={handleChange}
            required
          />
          <Button type="submit">Atualizar</Button>
        </form>
      </div>
    </div>
  );
};

export default Chart;
