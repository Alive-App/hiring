import React from 'react';
import StockDetails from '../../components/StockDetails';
import StockChart from '../../components/StockChart';
import './styles.scss';
import StockCompare from '../../components/StockCompare';
import StockProjection from '../../components/StockProjection';

function Stock({ id }) {
  return (
    <div>
      <StockDetails id={id} />
      <StockChart id={id} />
      <StockProjection id={id} />
      <StockCompare id={id} />
    </div>
  );
}
export default Stock;
