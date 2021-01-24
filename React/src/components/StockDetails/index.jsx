import { isValid, parseISO } from 'date-fns';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Message } from 'primereact/message';
import { ProgressBar } from 'primereact/progressbar';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { addToPortfolio, removeFromPortfolio } from '../../actions/portfolio';
import store from '../../config/store';
import { useAPI } from '../../utils/api';

export const defaultData = { list: [], metadata: {} };

function StockDetails({ id }) {
  const [{ loading: loadingStock, error: stockError }, fetchStock] = useAPI('company_overview', 'fundamental');

  const { updated, portfolio, stock = {} } = useSelector(
    (state) => ({
      stock: state.history.stock[id],
      portfolio: state.portfolio,
      updated: ((state.history.intraday || {})[id] || defaultData).metadata.updated,
    }),
    shallowEqual,
  );

  const refreshStock = React.useCallback(async (id) => {
    await fetchStock({ params: [id] });
  }, []);

  const values = React.useMemo(() => {
    let length = 0;
    let yesterday = [];
    let today = [];
    if (updated) {
      const { list = [] } = (store.getState().history.daily || {})[id] || defaultData;
      length = list.length;
      yesterday = list[length - 2] || [];
      today = list[length - 1] || [];
    }
    const [_, close = 0, high = 0, low = 0, open = 0] = today || [];
    const diff = close - (yesterday[1] || 0);

    return {
      high: high.toFixed(2),
      low: low.toFixed(2),
      open: open.toFixed(2),
      close: close.toFixed(2),
      percent: ((diff / close) * 100 || 0).toFixed(2),
      diff: diff.toFixed(2),
    };
  }, [updated, id]);

  const onPortfolio = React.useMemo(() => store.getState().portfolio.findIndex(({ Symbol }) => Symbol == id) > -1, [id, portfolio.length]);

  React.useEffect(() => {
    if (id) refreshStock(id);
  }, [id]);

  return (
    <div className="p-card p-mb-2 p-p-2">
      {!!loadingStock && <ProgressBar className="top-progress" mode="indeterminate" />}
      {!!stockError && (
        <div className="p-col-12">
          <Message
            severity="warn"
            text={
              <>
                (Dados offline): {stockError} <Button label="tentar novamente" className="p-button-text" onClick={() => refreshStock(id)} />
              </>
            }
          />
        </div>
      )}
      <div className="p-grid">
        <div className="p-col">
          <h3 className="p-m-0 p-d-flex p-align-center" style={{ fontSize: '18pt' }}>
            <Button
              className={'p-button-text'}
              disabled={loadingStock || stockError}
              onClick={() => {
                if (onPortfolio) removeFromPortfolio(stock);
                else addToPortfolio(stock);
              }}
              icon={onPortfolio ? 'pi pi-star' : 'pi pi-star-o'}
            />
            {stock.Name}
          </h3>
          <div className="p-d-flex p-flex-row p-justify-between p-text-secondary">
            <div>
              <span id="symbol" className="p-mr-2" style={{ fontSize: 20 }}>
                {stock.Symbol}
              </span>
              <span id="close" className="p-text-bold" style={{ fontSize: 16 }}>
                {' '}
                {values.close}
              </span>{' '}
              {stock.Currency}
              <span id="diff" style={{ color: values.diff > 0 ? 'green' : 'red' }}>{` ${values.diff} (${values.percent}%)`}</span>
              <span id="high" className="p-ml-2">
                <i className="pi pi-arrow-up" style={{ color: 'green' }} /> <span>{values.high}</span>
              </span>
              <span id="low" className="p-ml-2">
                <i className="pi pi-arrow-down" style={{ color: 'red' }} /> <span>{values.low}</span>
              </span>
            </div>
            <span>{updated && isValid(parseISO(updated)) && `Última atualização ${parseISO(updated).toLocaleDateString()}`}</span>
          </div>
        </div>
      </div>
      <Tooltip target="#symbol" position="top" content="Ação" className="p-ml-2" />
      <Tooltip target="#close" position="top" content="Valor" className="p-ml-2" />
      <Tooltip target="#diff" position="top" content="Diferença e percentual em relação ao dia anterior" className="p-ml-2" />
      <Tooltip target="#high" position="top" content="Alta" className="p-ml-2" />
      <Tooltip target="#low" position="top" content="Baixa" className="p-ml-2" />
    </div>
  );
}

export default StockDetails;
