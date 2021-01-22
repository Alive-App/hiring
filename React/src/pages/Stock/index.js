import React from 'react';
import Chart from 'react-google-charts';
import { TabView, TabPanel } from 'primereact/tabview';
import { TabMenu } from 'primereact/tabmenu';
import { shallowEqual, useSelector } from 'react-redux';
import { refreshHistory } from '../../actions/history';
import { av } from '../../utils/api';
import { Button } from 'primereact/button';
import { addToPortfolio } from '../../actions/portfolio';

// import { Container } from './styles';
const defaultData = { list: [], metadata: {} };
function Stock({ id }) {
  const [loadingOverview, setLoadingOverview] = React.useState(false);
  const [loadingByType, setLoadingByType] = React.useState(false);
  const [activeType, setActiveType] = React.useState(0);
  const [type, setType] = React.useState('intraday');
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
      onPortfolio:
        state.portfolio.findIndex(({ Symbol }) => {
          console.log('Symbol', Symbol, id);
          return Symbol == id;
        }) > -1,
      intraday: (state.history.intraday || {})[id] || defaultData,
      daily: (state.history.daily || {})[id] || defaultData,
      weelky: (state.history.weelky || {})[id] || defaultData,
      monthly: (state.history.monthly || {})[id] || defaultData,
    }),
    shallowEqual,
  );
  console.log(storeChartData);
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
        setLoadingByType(true);
        setChartError(false);
        const data = /* API_CHART_DATA; */ await av.data[type](id, 'compact', 'json', '5min');
        let [metadata, list] = Object.keys(data);
        metadata = data[metadata];
        list = data[list];

        setChartData((old) => {
          old[type] = { metadata, list: [] };
          old[type].list = [...Object.entries(list).map(([key, d]) => [key, parseFloat(av.util.polish(d).close)])].reverse();
          old[type].list.unshift(['x', 'Preço']);
          refreshHistory({ symbol: id, type, ...old[type] });
          return { ...old };
        });
      } catch (err) {
        handleError(err, setChartError);

        setLoadingByType(false);
      }
      setLoadingByType(false);
    },
    [type],
  );

  React.useEffect(() => {
    if (id) {
      refreshOverview(id);
    }
  }, [id]);
  React.useEffect(() => {
    if (id) {
      refreshByType(id);
    }
  }, [refreshByType]);

  return (
    <div>
      {!!loadingOverview && <h5>Carregando dados da empresa ...</h5>}
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
                onClick={() => addToPortfolio(stock)}
                label={storeChartData.onPortfolio ? 'Remover do portfolio' : 'Adicionar ao portfolio'}
                icon={storeChartData.onPortfolio ? 'pi pi-minus' : 'pi pi-plus'}
              />
            </div>
            <h4>{stock.Symbol}</h4> <span>{stock.AssetType}</span>
          </div>
          <h6>{stock.Name}</h6>
          <div className="p-col-12"></div>
        </div>
      )}
      {!!loadingByType && <h5>Carregando histórico ...</h5>}
      {!!chartError && <h5>{chartError}</h5>}
      {!loadingByType && !chartError && (
        <>
          <TabMenu
            model={[
              { value: 'intraday', label: 'Hoje' },
              { value: 'daily', label: 'Diário' },
              { value: 'weekly', label: 'Semanal' },
              { value: 'monthly', label: 'Mensal' },
            ]}
            activeItem={activeType}
            onTabChange={(e) => {
              setActiveType(e.value);
            }}
          />

          <Chart
            width={'90vw'}
            chartType="LineChart"
            loader={<div>Desenhando gráficos...</div>}
            data={chartData[type].list}
            options={options}
            rootProps={{ 'data-testid': '2' }}
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

/*
const API_CHART_DATA = {
  'Meta Data': {
    '1. Information': 'Daily Prices (open, high, low, close) and Volumes',
    '2. Symbol': 'aapl',
    '3. Last Refreshed': '2021-01-21',
    '4. Output Size': 'Compact',
    '5. Time Zone': 'US/Eastern',
  },
  'Time Series (Daily)': {
    '2021-01-21': {
      '1. open': '133.8000',
      '2. high': '139.6700',
      '3. low': '133.5900',
      '4. close': '136.8700',
      '5. volume': '118820194',
    },
    '2021-01-20': {
      '1. open': '128.6600',
      '2. high': '132.4900',
      '3. low': '128.5500',
      '4. close': '132.0300',
      '5. volume': '104319489',
    },
    '2021-01-19': {
      '1. open': '127.7800',
      '2. high': '128.7100',
      '3. low': '126.9380',
      '4. close': '127.8300',
      '5. volume': '90757329',
    },
    '2021-01-15': {
      '1. open': '128.7800',
      '2. high': '130.2242',
      '3. low': '127.0000',
      '4. close': '127.1400',
      '5. volume': '111598531',
    },
    '2021-01-14': {
      '1. open': '130.8000',
      '2. high': '131.0000',
      '3. low': '128.7600',
      '4. close': '128.9100',
      '5. volume': '90221755',
    },
    '2021-01-13': {
      '1. open': '128.7600',
      '2. high': '131.4500',
      '3. low': '128.4900',
      '4. close': '130.8900',
      '5. volume': '88636831',
    },
    '2021-01-12': {
      '1. open': '128.5000',
      '2. high': '129.6900',
      '3. low': '126.8600',
      '4. close': '128.8000',
      '5. volume': '90440255',
    },
    '2021-01-11': {
      '1. open': '129.1900',
      '2. high': '130.1700',
      '3. low': '128.5000',
      '4. close': '128.9800',
      '5. volume': '100620880',
    },
    '2021-01-08': {
      '1. open': '132.4300',
      '2. high': '132.6300',
      '3. low': '130.2300',
      '4. close': '132.0500',
      '5. volume': '105158245',
    },
    '2021-01-07': {
      '1. open': '128.3600',
      '2. high': '131.6300',
      '3. low': '127.8600',
      '4. close': '130.9200',
      '5. volume': '109578157',
    },
    '2021-01-06': {
      '1. open': '127.7200',
      '2. high': '131.0499',
      '3. low': '126.3820',
      '4. close': '126.6000',
      '5. volume': '155087970',
    },
    '2021-01-05': {
      '1. open': '128.8900',
      '2. high': '131.7400',
      '3. low': '128.4300',
      '4. close': '131.0100',
      '5. volume': '97664898',
    },
    '2021-01-04': {
      '1. open': '133.5200',
      '2. high': '133.6116',
      '3. low': '126.7600',
      '4. close': '129.4100',
      '5. volume': '143301887',
    },
    '2020-12-31': {
      '1. open': '134.0800',
      '2. high': '134.7400',
      '3. low': '131.7200',
      '4. close': '132.6900',
      '5. volume': '99116586',
    },
    '2020-12-30': {
      '1. open': '135.5800',
      '2. high': '135.9900',
      '3. low': '133.4000',
      '4. close': '133.7200',
      '5. volume': '96452124',
    },
    '2020-12-29': {
      '1. open': '138.0500',
      '2. high': '138.7890',
      '3. low': '134.3409',
      '4. close': '134.8700',
      '5. volume': '121047324',
    },
    '2020-12-28': {
      '1. open': '133.9900',
      '2. high': '137.3400',
      '3. low': '133.5100',
      '4. close': '136.6900',
      '5. volume': '123124632',
    },
    '2020-12-24': {
      '1. open': '131.3200',
      '2. high': '133.4600',
      '3. low': '131.1000',
      '4. close': '131.9700',
      '5. volume': '54930064',
    },
    '2020-12-23': {
      '1. open': '132.1600',
      '2. high': '132.4300',
      '3. low': '130.7800',
      '4. close': '130.9600',
      '5. volume': '88223692',
    },
    '2020-12-22': {
      '1. open': '131.6100',
      '2. high': '134.4050',
      '3. low': '129.6500',
      '4. close': '131.8800',
      '5. volume': '169351825',
    },
    '2020-12-21': {
      '1. open': '125.0200',
      '2. high': '128.3100',
      '3. low': '123.4490',
      '4. close': '128.2300',
      '5. volume': '121251553',
    },
    '2020-12-18': {
      '1. open': '128.9600',
      '2. high': '129.1000',
      '3. low': '126.1200',
      '4. close': '126.6550',
      '5. volume': '192541496',
    },
    '2020-12-17': {
      '1. open': '128.9000',
      '2. high': '129.5800',
      '3. low': '128.0450',
      '4. close': '128.7000',
      '5. volume': '94359811',
    },
    '2020-12-16': {
      '1. open': '127.4100',
      '2. high': '128.3700',
      '3. low': '126.5600',
      '4. close': '127.8100',
      '5. volume': '98208591',
    },
    '2020-12-15': {
      '1. open': '124.3400',
      '2. high': '127.9000',
      '3. low': '124.1300',
      '4. close': '127.8800',
      '5. volume': '157572262',
    },
    '2020-12-14': {
      '1. open': '122.6000',
      '2. high': '123.3500',
      '3. low': '121.5400',
      '4. close': '121.7800',
      '5. volume': '79075988',
    },
    '2020-12-11': {
      '1. open': '122.4300',
      '2. high': '122.7600',
      '3. low': '120.5500',
      '4. close': '122.4100',
      '5. volume': '86939786',
    },
    '2020-12-10': {
      '1. open': '120.5000',
      '2. high': '123.8700',
      '3. low': '120.1500',
      '4. close': '123.2400',
      '5. volume': '81312170',
    },
    '2020-12-09': {
      '1. open': '124.5300',
      '2. high': '125.9500',
      '3. low': '121.0000',
      '4. close': '121.7800',
      '5. volume': '115089193',
    },
    '2020-12-08': {
      '1. open': '124.3700',
      '2. high': '124.9800',
      '3. low': '123.0900',
      '4. close': '124.3800',
      '5. volume': '82225512',
    },
    '2020-12-07': {
      '1. open': '122.3100',
      '2. high': '124.5700',
      '3. low': '122.2500',
      '4. close': '123.7500',
      '5. volume': '86711990',
    },
    '2020-12-04': {
      '1. open': '122.6000',
      '2. high': '122.8608',
      '3. low': '121.5200',
      '4. close': '122.2500',
      '5. volume': '78260421',
    },
    '2020-12-03': {
      '1. open': '123.5200',
      '2. high': '123.7800',
      '3. low': '122.2100',
      '4. close': '122.9400',
      '5. volume': '78967630',
    },
    '2020-12-02': {
      '1. open': '122.0200',
      '2. high': '123.3700',
      '3. low': '120.8900',
      '4. close': '123.0800',
      '5. volume': '89004195',
    },
    '2020-12-01': {
      '1. open': '121.0100',
      '2. high': '123.4693',
      '3. low': '120.0100',
      '4. close': '122.7200',
      '5. volume': '125920963',
    },
    '2020-11-30': {
      '1. open': '116.9700',
      '2. high': '120.9700',
      '3. low': '116.8100',
      '4. close': '119.0500',
      '5. volume': '169410176',
    },
    '2020-11-27': {
      '1. open': '116.5700',
      '2. high': '117.4900',
      '3. low': '116.2200',
      '4. close': '116.5900',
      '5. volume': '46691331',
    },
    '2020-11-25': {
      '1. open': '115.5500',
      '2. high': '116.7500',
      '3. low': '115.1700',
      '4. close': '116.0300',
      '5. volume': '76499234',
    },
    '2020-11-24': {
      '1. open': '113.9100',
      '2. high': '115.8500',
      '3. low': '112.5900',
      '4. close': '115.1700',
      '5. volume': '113226248',
    },
    '2020-11-23': {
      '1. open': '117.1800',
      '2. high': '117.6202',
      '3. low': '113.7500',
      '4. close': '113.8500',
      '5. volume': '127959318',
    },
    '2020-11-20': {
      '1. open': '118.6400',
      '2. high': '118.7700',
      '3. low': '117.2900',
      '4. close': '117.3400',
      '5. volume': '73604287',
    },
    '2020-11-19': {
      '1. open': '117.5900',
      '2. high': '119.0600',
      '3. low': '116.8100',
      '4. close': '118.6400',
      '5. volume': '74112972',
    },
    '2020-11-18': {
      '1. open': '118.6100',
      '2. high': '119.8200',
      '3. low': '118.0000',
      '4. close': '118.0300',
      '5. volume': '76322111',
    },
    '2020-11-17': {
      '1. open': '119.5500',
      '2. high': '120.6741',
      '3. low': '118.9600',
      '4. close': '119.3900',
      '5. volume': '74270973',
    },
    '2020-11-16': {
      '1. open': '118.9200',
      '2. high': '120.9900',
      '3. low': '118.1460',
      '4. close': '120.3000',
      '5. volume': '91183018',
    },
    '2020-11-13': {
      '1. open': '119.4400',
      '2. high': '119.6717',
      '3. low': '117.8700',
      '4. close': '119.2600',
      '5. volume': '81688586',
    },
    '2020-11-12': {
      '1. open': '119.6200',
      '2. high': '120.5300',
      '3. low': '118.5700',
      '4. close': '119.2100',
      '5. volume': '103350674',
    },
    '2020-11-11': {
      '1. open': '117.1900',
      '2. high': '119.6300',
      '3. low': '116.4400',
      '4. close': '119.4900',
      '5. volume': '112294954',
    },
    '2020-11-10': {
      '1. open': '115.5500',
      '2. high': '117.5900',
      '3. low': '114.1300',
      '4. close': '115.9700',
      '5. volume': '138023390',
    },
    '2020-11-09': {
      '1. open': '120.5000',
      '2. high': '121.9900',
      '3. low': '116.0500',
      '4. close': '116.3200',
      '5. volume': '154515315',
    },
    '2020-11-06': {
      '1. open': '118.3200',
      '2. high': '119.2000',
      '3. low': '116.1300',
      '4. close': '118.6900',
      '5. volume': '114457922',
    },
    '2020-11-05': {
      '1. open': '117.9500',
      '2. high': '119.6200',
      '3. low': '116.8686',
      '4. close': '119.0300',
      '5. volume': '126387074',
    },
    '2020-11-04': {
      '1. open': '114.1400',
      '2. high': '115.5900',
      '3. low': '112.3500',
      '4. close': '114.9500',
      '5. volume': '138235482',
    },
    '2020-11-03': {
      '1. open': '109.6600',
      '2. high': '111.4900',
      '3. low': '108.7300',
      '4. close': '110.4400',
      '5. volume': '107624448',
    },
    '2020-11-02': {
      '1. open': '109.1100',
      '2. high': '110.6800',
      '3. low': '107.3200',
      '4. close': '108.7700',
      '5. volume': '122866899',
    },
    '2020-10-30': {
      '1. open': '111.0600',
      '2. high': '111.9900',
      '3. low': '107.7200',
      '4. close': '108.8600',
      '5. volume': '190573476',
    },
    '2020-10-29': {
      '1. open': '112.3700',
      '2. high': '116.9300',
      '3. low': '112.2000',
      '4. close': '115.3200',
      '5. volume': '146129173',
    },
    '2020-10-28': {
      '1. open': '115.0500',
      '2. high': '115.4300',
      '3. low': '111.1000',
      '4. close': '111.2000',
      '5. volume': '143937823',
    },
    '2020-10-27': {
      '1. open': '115.4900',
      '2. high': '117.2800',
      '3. low': '114.5399',
      '4. close': '116.6000',
      '5. volume': '92276772',
    },
    '2020-10-26': {
      '1. open': '114.0100',
      '2. high': '116.5500',
      '3. low': '112.8800',
      '4. close': '115.0500',
      '5. volume': '111850657',
    },
    '2020-10-23': {
      '1. open': '116.3900',
      '2. high': '116.5500',
      '3. low': '114.2800',
      '4. close': '115.0400',
      '5. volume': '82572645',
    },
    '2020-10-22': {
      '1. open': '117.4500',
      '2. high': '118.0400',
      '3. low': '114.5900',
      '4. close': '115.7500',
      '5. volume': '101987954',
    },
    '2020-10-21': {
      '1. open': '116.6700',
      '2. high': '118.7050',
      '3. low': '116.4500',
      '4. close': '116.8700',
      '5. volume': '89945980',
    },
    '2020-10-20': {
      '1. open': '116.2000',
      '2. high': '118.9800',
      '3. low': '115.6300',
      '4. close': '117.5100',
      '5. volume': '124423728',
    },
    '2020-10-19': {
      '1. open': '119.9600',
      '2. high': '120.4190',
      '3. low': '115.6600',
      '4. close': '115.9800',
      '5. volume': '120639337',
    },
    '2020-10-16': {
      '1. open': '121.2800',
      '2. high': '121.5480',
      '3. low': '118.8100',
      '4. close': '119.0200',
      '5. volume': '115393808',
    },
    '2020-10-15': {
      '1. open': '118.7200',
      '2. high': '121.2000',
      '3. low': '118.1500',
      '4. close': '120.7100',
      '5. volume': '112559219',
    },
    '2020-10-14': {
      '1. open': '121.0000',
      '2. high': '123.0300',
      '3. low': '119.6200',
      '4. close': '121.1900',
      '5. volume': '151062308',
    },
    '2020-10-13': {
      '1. open': '125.2700',
      '2. high': '125.3900',
      '3. low': '119.6500',
      '4. close': '121.1000',
      '5. volume': '262330451',
    },
    '2020-10-12': {
      '1. open': '120.0600',
      '2. high': '125.1800',
      '3. low': '119.2845',
      '4. close': '124.4000',
      '5. volume': '240226769',
    },
    '2020-10-09': {
      '1. open': '115.2800',
      '2. high': '117.0000',
      '3. low': '114.9200',
      '4. close': '116.9700',
      '5. volume': '100506865',
    },
    '2020-10-08': {
      '1. open': '116.2500',
      '2. high': '116.4000',
      '3. low': '114.5901',
      '4. close': '114.9700',
      '5. volume': '83477153',
    },
    '2020-10-07': {
      '1. open': '114.6200',
      '2. high': '115.5500',
      '3. low': '114.1300',
      '4. close': '115.0800',
      '5. volume': '96848985',
    },
    '2020-10-06': {
      '1. open': '115.7000',
      '2. high': '116.1200',
      '3. low': '112.2500',
      '4. close': '113.1600',
      '5. volume': '161498212',
    },
    '2020-10-05': {
      '1. open': '113.9100',
      '2. high': '116.6500',
      '3. low': '113.5500',
      '4. close': '116.5000',
      '5. volume': '106243839',
    },
    '2020-10-02': {
      '1. open': '112.8900',
      '2. high': '115.3700',
      '3. low': '112.2200',
      '4. close': '113.0200',
      '5. volume': '144711986',
    },
    '2020-10-01': {
      '1. open': '117.6400',
      '2. high': '117.7200',
      '3. low': '115.8300',
      '4. close': '116.7900',
      '5. volume': '116120440',
    },
    '2020-09-30': {
      '1. open': '113.7900',
      '2. high': '117.2600',
      '3. low': '113.6200',
      '4. close': '115.8100',
      '5. volume': '142675184',
    },
    '2020-09-29': {
      '1. open': '114.5500',
      '2. high': '115.3100',
      '3. low': '113.5700',
      '4. close': '114.0900',
      '5. volume': '100060526',
    },
    '2020-09-28': {
      '1. open': '115.0100',
      '2. high': '115.3200',
      '3. low': '112.7800',
      '4. close': '114.9600',
      '5. volume': '137672403',
    },
    '2020-09-25': {
      '1. open': '108.4300',
      '2. high': '112.4400',
      '3. low': '107.6700',
      '4. close': '112.2800',
      '5. volume': '149981441',
    },
    '2020-09-24': {
      '1. open': '105.1700',
      '2. high': '110.2500',
      '3. low': '105.0000',
      '4. close': '108.2200',
      '5. volume': '167743349',
    },
    '2020-09-23': {
      '1. open': '111.6200',
      '2. high': '112.1100',
      '3. low': '106.7700',
      '4. close': '107.1200',
      '5. volume': '150718671',
    },
    '2020-09-22': {
      '1. open': '112.6800',
      '2. high': '112.8600',
      '3. low': '109.1600',
      '4. close': '111.8100',
      '5. volume': '183055373',
    },
    '2020-09-21': {
      '1. open': '104.5400',
      '2. high': '110.1900',
      '3. low': '103.1000',
      '4. close': '110.0800',
      '5. volume': '195713815',
    },
    '2020-09-18': {
      '1. open': '110.4000',
      '2. high': '110.8800',
      '3. low': '106.0900',
      '4. close': '106.8400',
      '5. volume': '287104882',
    },
    '2020-09-17': {
      '1. open': '109.7200',
      '2. high': '112.2000',
      '3. low': '108.7100',
      '4. close': '110.3400',
      '5. volume': '178010968',
    },
    '2020-09-16': {
      '1. open': '115.2300',
      '2. high': '116.0000',
      '3. low': '112.0400',
      '4. close': '112.1300',
      '5. volume': '155026675',
    },
    '2020-09-15': {
      '1. open': '118.3300',
      '2. high': '118.8290',
      '3. low': '113.6100',
      '4. close': '115.5400',
      '5. volume': '184642039',
    },
    '2020-09-14': {
      '1. open': '114.7200',
      '2. high': '115.9300',
      '3. low': '112.8000',
      '4. close': '115.3550',
      '5. volume': '140150087',
    },
    '2020-09-11': {
      '1. open': '114.5700',
      '2. high': '115.2300',
      '3. low': '110.0000',
      '4. close': '112.0000',
      '5. volume': '180860325',
    },
    '2020-09-10': {
      '1. open': '120.3600',
      '2. high': '120.5000',
      '3. low': '112.5000',
      '4. close': '113.4900',
      '5. volume': '182274391',
    },
    '2020-09-09': {
      '1. open': '117.2600',
      '2. high': '119.1400',
      '3. low': '115.2600',
      '4. close': '117.3200',
      '5. volume': '176940455',
    },
    '2020-09-08': {
      '1. open': '113.9500',
      '2. high': '118.9900',
      '3. low': '112.6800',
      '4. close': '112.8200',
      '5. volume': '231366563',
    },
    '2020-09-04': {
      '1. open': '120.0700',
      '2. high': '123.7000',
      '3. low': '110.8900',
      '4. close': '120.9600',
      '5. volume': '332607163',
    },
    '2020-09-03': {
      '1. open': '126.9100',
      '2. high': '128.8400',
      '3. low': '120.5000',
      '4. close': '120.8800',
      '5. volume': '257599640',
    },
    '2020-09-02': {
      '1. open': '137.5900',
      '2. high': '137.9800',
      '3. low': '127.0000',
      '4. close': '131.4000',
      '5. volume': '200118991',
    },
    '2020-09-01': {
      '1. open': '132.7600',
      '2. high': '134.8000',
      '3. low': '130.5300',
      '4. close': '134.1800',
      '5. volume': '152470142',
    },
    '2020-08-31': {
      '1. open': '127.5800',
      '2. high': '131.0000',
      '3. low': '126.0000',
      '4. close': '129.0400',
      '5. volume': '223505733',
    },
  },
};
 */
