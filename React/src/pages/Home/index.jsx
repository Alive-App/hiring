import { navigate } from 'hookrouter';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import StockItem from '../../components/StockItem';

import './styles.scss';
const Home = () => {
  const portfolio = useSelector((state) => state.portfolio, shallowEqual);

  const renderItems = React.useCallback(
    (data, i) => <StockItem key={i} data={data} onClick={() => navigate(`/stock/${data.Symbol}`)} />,
    [],
  );

  return (
    <div className="p-mt-4">
      <h3>Meu portfolio</h3>
      <div className="p-col-4 p-col">
        {!portfolio.length && <h5>Lista vazia, busque uma empresa e favorite-a para aparecer aqui.</h5>}
        {!!portfolio.length && portfolio.map(renderItems)}
      </div>
    </div>
  );
};

export default Home;
