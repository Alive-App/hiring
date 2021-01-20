import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Api from "../../services/api";
import { AppStore } from "../../store";
import { useForm } from "../../hooks";
import { Input, DateSwitch } from "../index";

import "./styles.sass";

const TopBar = () => {
  const api = new Api();

  const { symbol, symbolFound, searchResult } = AppStore.useState((state) => ({
    symbol: state.symbol,
    symbolFound: state.symbolFound,
    searchResult: state.searchResult,
  }));
  const [handleChange] = useForm();

  return (
    <header className="top-bar">
      <div className="logo">
        <h1 className="title">scot</h1>
        <span className="subtitle">stock viewer</span>
      </div>
      <DateSwitch />
      <div className="search">
        <Input
          type="text"
          placeholder="Busque uma empresa..."
          name="symbol"
          onChange={handleChange}
          autoComplete="false"
        />
        <FontAwesomeIcon
          icon="search"
          className="icon"
          onClick={() => {
            if (symbol && !symbolFound) {
              api.searchStocks(symbol).then((response) => {
                if (response.status === 200) {
                  AppStore.update((state) => {
                    state.searchResult = response.data.bestMatches
                      ? response.data.bestMatches
                      : [];
                  });
                } else {
                  AppStore.update((state) => {
                    state.alertMessage = response.error;
                  });
                }
              });
            }
          }}
        />
        {searchResult.length > 0 ? (
          <div className="result-box">
            {searchResult.map((result) => (
              <div
                className="result"
                key={result["1. symbol"]}
                onClick={() => {
                  AppStore.update((state) => {
                    state.symbolFound = true;
                    state.symbol = result["1. symbol"];
                    state.selectedStock = result;
                    state.searchResult = [];
                  });
                }}
              >
                <span className="result-symbol">{result["1. symbol"]}</span>
                <span className="result-name">{result["2. name"]}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default TopBar;
