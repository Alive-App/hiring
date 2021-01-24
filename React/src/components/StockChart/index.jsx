import React from 'react';
import Chart from 'react-google-charts';

import { Skeleton } from 'primereact/skeleton';
import { ProgressBar } from 'primereact/progressbar';
import { TabMenu } from 'primereact/tabmenu';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';

import { useAPI } from '../../utils/api';
import { parseISO } from 'date-fns';
import { defaultData } from '../StockDetails';
import { shallowEqual, useSelector } from 'react-redux';

const TABS = [
  { value: 'intraday', label: '24h', icon: 'pi pi-fw pi-calendar' },
  { value: 'daily', label: 'Diário', icon: 'pi pi-fw pi-calendar' },
  { value: 'weekly', label: 'Semanal', icon: 'pi pi-fw pi-calendar' },
  { value: 'monthly', label: 'Mensal', icon: 'pi pi-fw pi-calendar' },
];
function StockChart({ id }) {
  const [activeType, setTabItem] = React.useState(TABS[1]);

  const [type, setType] = React.useState('daily');

  const [{ loading: loadingChart, error: chartError }, fetchChart] = useAPI('daily');

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

  const refreshChart = React.useCallback(
    async (id) => {
      await fetchChart({ fn: type, params: [id, 'compact', 'json', '15min'] });
    },
    [type],
  );

  const chartList = React.useMemo(
    () =>
      storeChartData[type]
        ? storeChartData[type].list.map((v, i) => {
            if (i && typeof v[0] == 'string') v[0] = parseISO(v[0]);
            return v;
          }) || []
        : [],
    [storeChartData[type]],
  );

  React.useEffect(() => {
    if (id) refreshChart(id);
  }, [refreshChart]);

  return (
    <>
      <TabMenu
        model={TABS}
        activeItem={activeType}
        onTabChange={(e) => {
          setTabItem(e.value);
          setType(e.value.value);
        }}
      />
      <div className="p-card chart-container p-mt-3 p-d-flex p-p-3 p-flex-column">
        {!!loadingChart && <ProgressBar className="top-progress" mode="indeterminate" />}
        {!!chartError && (
          <div className="p-col-12">
            <Message
              severity="warn"
              text={
                <>
                  (Dados offline): {chartError}{' '}
                  <Button label="tentar novamente" className="p-button-text" onClick={() => refreshChart(id)} />
                </>
              }
            />
          </div>
        )}
        {loadingChart && (
          <>
            <Skeleton width="400px" height="25px" />
            <Skeleton className="p-mt-2" width="100%" height="150px" />
          </>
        )}
        {!!chartList.length && !loadingChart && (
          <>
            <Chart
              chartType="LineChart"
              loader={<div className="p-d-flex p-justify-center p-align-center">Desenhando gráficos...</div>}
              data={chartList}
              options={{
                hAxis: { title: 'Tempo' },
                vAxis: { title: 'Valor ' },
                series: { 1: { curveType: 'function' } },
              }}
              rootProps={{ 'data-testid': '2' }}
              controls={
                chartList.length
                  ? [
                      {
                        controlType: 'DateRangeFilter',

                        options: {
                          filterColumnLabel: 'x',

                          ui: { format: { pattern: 'dd-MM-yyyy' } },
                        },
                      },
                    ]
                  : null
              }
            />
          </>
        )}
      </div>
    </>
  );
}

export default StockChart;
