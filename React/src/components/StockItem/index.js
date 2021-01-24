import React from 'react';

// import { Container } from './styles';

const StockItem = ({ data, onClick }) => {
  return (
    <div className="p-card p-mt-2" style={{ cursor: 'pointer' }} onClick={onClick}>
      <div className="product-item">
        <div className="product-detail">
          <div className="p-d-flex p-flex-row p-justify-between">
            <div className="product-name">{data.name || data.Name}</div>
            <div>
              <i className="pi pi-flag product-category-icon"></i>
              <span className="product-category">
                {data.region || data.Country} ({data.currency || data.Currency})
              </span>
            </div>
          </div>
          <div className="product-description">{data.symbol || data.Symbol}</div>
        </div>
      </div>
    </div>
  );
};

export default StockItem;
