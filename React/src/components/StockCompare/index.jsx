import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import React from 'react';
import Chart from 'react-google-charts';

import { useSelector } from 'react-redux';

import { SearchContext } from '../../pages';
import { useAPI } from '../../utils/api';
import { defaultData } from '../StockDetails';

// import { Container } from './styles';

function StockCompare({ id }) {
  const [{ loading, error }, fetchData] = useAPI('daily');
  const { open, close } = React.useContext(SearchContext);
  const [stocks, setStocks] = React.useState([]);
  const dailyList = useSelector((state) => state.history.daily);
  const addStock = React.useCallback(async (d) => {
    if (d) {
      const { value: stock } = d;
      setStocks((old) => [stock, ...old]);
      close();
      await fetchData({ params: [stock.symbol, 'compact', 'json', '5min'] });
    }
  }, []);

  const chartData = React.useMemo(() => {
    let v = [['Nome', 'Valor', 'Alta', 'Baixa']];
    const arr = [...stocks];
    arr.unshift({ symbol: id });

    for (let i = 0; i < arr.length; i++) {
      const { symbol } = arr[i];

      const { list = [] } = (dailyList || {})[symbol] || defaultData;
      const [_, close = 0, high = 0, low = 0] = list[1] || [];
      v.push([symbol, close, high, low]);
    }
    return v;
  }, [stocks, id, dailyList]);

  return (
    <div className="p-card p-p-2  p-mt-2">
      <div className="p-grid">
        <div className="p-col p-text-bold p-d-flex p-align-center">
          Comparar ação
          <Button icon="pi pi-plus" label="Adicionar ação" className="p-ml-3 p-button-sm p-button-text" onClick={() => open(addStock)} />
        </div>
        <div className="p-col"></div>
      </div>
      <div>
        {stocks.map(({ symbol, name }, i) => {
          const diff = (chartData[i + 2][1] - chartData[1][1]).toFixed(2);

          return (
            <div key={i} className="p-d-flex p-flex-row p-justify-between p-text-secondary">
              <div className="p-col">
                <span className="p-text-bold" style={{ fontSize: 20 }}>
                  {symbol}
                </span>{' '}
                {name}{' '}
                <span className="p-text-bold">
                  {chartData[i + 2][1]}
                  <span style={{ color: diff < 0 ? 'red' : 'green' }}> ({diff})</span>
                </span>
              </div>
              <div className="p-col-2">
                <Button
                  icon="pi pi-minus"
                  className="p-button-danger"
                  onClick={() =>
                    setStocks((old) => {
                      old.splice(i, 1);
                      return [...old];
                    })
                  }
                />
              </div>
            </div>
          );
        })}
        {loading && <Skeleton width="85vw" height="400px" />}
        {!loading && !!stocks.length && (
          <Chart
            height="400px"
            chartType="BarChart"
            loader={<div>Desenhando gráficos</div>}
            data={chartData}
            options={{
              title: '',
              chartArea: { width: '50%' },
              hAxis: {
                title: 'Valor',
                minValue: 0,
              },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        )}
      </div>
    </div>
  );
}

export default StockCompare;
