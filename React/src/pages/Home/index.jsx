import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { StockItem } from '..';

import './styles.scss';
const Home = () => {
  const portfolio = useSelector((state) => state.portfolio, shallowEqual);

  const renderPortfolio = React.useCallback((data) => <StockItem data={data} />, []);

  return (
    <div className="p-mt-4">
      <h3>Portfolio</h3>
      {portfolio.map(renderPortfolio)}
    </div>
  );
};

export default Home;
