import React from "react";

import "./styles.sass";

const StockDetails = ({ stockInfo }) => {
  return (
    <div className="stock-details">
      <div className="row">
        <span className="data-label">Preço atual</span>
        <span className="data">
          {stockInfo
            ? `US$ ${parseFloat(stockInfo["4. close"]).toFixed(2)}`
            : `N/A`}
        </span>
      </div>
      <div className="row">
        <span className="data-label">Preço máx.</span>
        <span className="data">
          {stockInfo
            ? `US$ ${parseFloat(stockInfo["2. high"]).toFixed(2)}`
            : `N/A`}
        </span>
      </div>
      <div className="row">
        <span className="data-label">Preço mín.</span>
        <span className="data">
          {stockInfo
            ? `US$ ${parseFloat(stockInfo["3. low"]).toFixed(2)}`
            : `N/A`}
        </span>
      </div>
      <div className="row">
        <span className="data-label">Abertura</span>
        <span className="data">
          {stockInfo
            ? `US$ ${parseFloat(stockInfo["1. open"]).toFixed(2)}`
            : `N/A`}
        </span>
      </div>
      <span className="last-update">
        {stockInfo ? `Dados do dia ${stockInfo.updated}` : `N/A`}
      </span>
    </div>
  );
};

export default StockDetails;
