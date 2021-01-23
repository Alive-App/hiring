import React from 'react';
import Chart from 'react-google-charts';
import { ProgressBar } from 'primereact/progressbar';
import { TabMenu } from 'primereact/tabmenu';
import { shallowEqual, useSelector } from 'react-redux';
import { refreshHistory } from '../../actions/history';
import { av } from '../../utils/api';
import { Button } from 'primereact/button';
import { addToPortfolio, removeFromPortfolio } from '../../actions/portfolio';
import { parseISO, subYears } from 'date-fns';

// import { Container } from './styles';
const defaultData = { list: [], metadata: {} };
function Stock({ id }) {
  const [loadingOverview, setLoadingOverview] = React.useState(false);
  const [loadingChartData, setLoadingChartdata] = React.useState(false);
  const [type, setType] = React.useState('daily');
  const [stock, setStock] = React.useState({});
  const [chartError, setChartError] = React.useState(null);
  const [overviewError, setOverviewError] = React.useState(null);
  const [chartData, setChartData] = React.useState({
    intraday: defaultData,
    daily: defaultData,
    weekly: defaultData,
    monthly: defaultData,
  });

  const storeChartData = useSelector(
    (state) => ({
      onPortfolio: state.portfolio.findIndex(({ Symbol }) => Symbol == id) > -1,
      intraday: (state.history.intraday || {})[id] || defaultData,
      daily: (state.history.daily || {})[id] || defaultData,
      weekly: (state.history.weekly || {})[id] || defaultData,
      monthly: (state.history.monthly || {})[id] || defaultData,
    }),
    shallowEqual,
  );

  const refreshOverview = React.useCallback(async (id) => {
    try {
      setLoadingOverview(true);
      const data = await av.fundamental.company_overview(id);
      setStock(data);
    } catch (err) {
      handleError(err, setOverviewError);
      setLoadingOverview(false);
    }
    setLoadingOverview(false);
  }, []);

  const refreshByType = React.useCallback(
    async (id) => {
      try {
        setLoadingChartdata(true);
        setChartError(false);
        const data = await av.data[type](id, 'compact', 'json', '5min');
        let [metadata, list = []] = Object.keys(data);
        metadata = data[metadata];
        list = data[list];

        setChartData((old) => {
          old[type] = { metadata, list: [] };
          old[type].list = [...Object.entries(list).map(([key, d]) => [parseISO(key), parseFloat(av.util.polish(d).close)])].reverse();
          old[type].list.unshift(['x', 'Preço']);
          refreshHistory({ symbol: id, type, ...old[type] });
          return { ...old };
        });
      } catch (err) {
        handleError(err, setChartError);

        setLoadingChartdata(false);
      }
      setLoadingChartdata(false);
    },
    [type],
  );

  const { closeValue, percent, diff } = React.useMemo(() => {
    let length = storeChartData.daily.list.length;
    let yesterday = storeChartData.daily.list[length - 2] || [];
    let today = storeChartData.daily.list[length - 1] || [];

    if (!chartError && !loadingChartData) {
      length = chartData.daily.list.length;
      yesterday = chartData.daily.list[length - 2] || [];
      today = chartData.daily.list[length - 1] || [];
    }

    const close = today[1] || 0;
    const diff = close - (yesterday[1] || 0) || 0;

    return { closeValue: close, percent: ((diff / close) * 100).toFixed(2), diff: diff.toFixed(2) };
  }, [chartData, loadingChartData, chartError, type, storeChartData]);

  const chartList = React.useMemo(() => {
    if (loadingChartData || chartError) {
      return storeChartData[type] ? storeChartData[type].list || [] : [];
    }
    if (!chartData[type].list.length && storeChartData[type]) {
      return storeChartData[type].list || [];
    }
    return chartData[type].list || [];
  }, [loadingChartData, chartData, chartError, storeChartData, type]);

  React.useEffect(() => {
    if (id) refreshOverview(id);
  }, [id]);

  React.useEffect(() => {
    if (id) refreshByType(id);
  }, [refreshByType]);

  return (
    <div>
      {(!!loadingOverview || loadingChartData) && <ProgressBar style={{ height: 5, margin: '-25px -25px 0' }} mode="indeterminate" />}
      {!!overviewError && <h5>{overviewError}</h5>}
      {!loadingOverview && (
        <div className="p-grid">
          <div className="p-col-12">
            <div className="p-col-6">
              <h2>{stock.Name}</h2>
            </div>
            <div className="p-col-6 d-flex align-items-center">
              <Button
                className={storeChartData.onPortfolio ? 'p-button-danger' : 'p-button-success'}
                disabled={loadingOverview || overviewError}
                onClick={() => {
                  if (storeChartData.onPortfolio) removeFromPortfolio(stock);
                  else addToPortfolio(stock);
                }}
                label={storeChartData.onPortfolio ? 'Remover do portfolio' : 'Adicionar ao portfolio'}
                icon={storeChartData.onPortfolio ? 'pi pi-minus' : 'pi pi-plus'}
              />
            </div>
            <h4>{stock.Symbol}</h4> <span>{stock.AssetType}</span>
          </div>
          <h6>{stock.Name}</h6>
          <div className="p-col-12">
            <span className="p-text-bol" style={{ fontSize: 22 }}>
              {' '}
              {closeValue}
            </span>{' '}
            {stock.Currency}{' '}
            <span style={{ color: diff > 0 ? 'green' : 'red' }}>
              {diff} ({percent}%)
            </span>
          </div>
        </div>
      )}
      {!!loadingChartData && <h5>Carregando histórico ...</h5>}
      {!!chartError && (
        <h5>
          <span style={{ color: 'red' }}>(Dados offline) </span>
          {chartError}{' '}
        </h5>
      )}
      <TabMenu
        model={[
          // { value: 'intraday', label: 'Hoje' },
          { value: 'daily', label: 'Diário' },
          { value: 'weekly', label: 'Semanal' },
          { value: 'monthly', label: 'Mensal' },
        ]}
        activeItem={type}
        onTabChange={(e) => {
          setType(e.value.value);
        }}
      />
      {!loadingChartData && !!chartList.length && (
        <>
          <Chart
            width={'90vw'}
            chartType="LineChart"
            loader={<div>Desenhando gráficos...</div>}
            data={chartList}
            options={options}
            rootProps={{ 'data-testid': '2' }}
            controls={[
              {
                controlType: 'ChartRangeFilter',
                options: {
                  filterColumnIndex: 0,
                  ui: {
                    chartType: 'LineChart',
                    chartOptions: {
                      chartArea: { width: '90vw', height: '50%' },
                      hAxis: { baselineColor: 'none' },
                    },
                  },
                },
                controlPosition: 'bottom',
                controlWrapperParams: {
                  state: {
                    range: { start: subYears(chartList[chartList.length - 1][0], 1), end: chartList[chartList.length - 1][0] },
                  },
                },
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
export default Stock;

const options = {
  hAxis: {
    title: 'Tempo',
  },
  vAxis: {
    title: 'Valor ',
  },
  series: {
    1: { curveType: 'function' },
  },
};

const handleError = (error, setError) => {
  if (String(error).includes('Note')) {
    setError(
      'É... você está indo muito rápido 🤔 Nossa API não aguenta mais que 5 visualizações por minuto. Tente novamente daqui a pouco 😊',
    );
  } else if (String(error).includes('Error Message')) {
    setError('É... algo deu errado ao obter dados desta empresa😢');
  } else {
    setError('Ops... algo deu errado 😢');
  }
};
