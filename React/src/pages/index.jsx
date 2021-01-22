import React from 'react';
import Home from './Home';
import { navigate, usePath, useRoutes } from 'hookrouter';
import { Dialog } from 'primereact/dialog';
import { useForm } from 'react-hook-form';
import { av } from '../utils/api';

import debounce from 'tiny-debounce';

import { DataTable } from 'primereact/datatable';

import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { shallowEqual, useSelector } from 'react-redux';
import Stock from './Stock';

const routes = {
  '/': (props) => <Home {...props} />,
  '/stock/:id': (props) => <Stock {...props} />,
};

const Navigation = () => {
  const path = usePath();
  const { register, handleSubmit, watch } = useForm();

  const Routes = useRoutes(routes);

  const portfolio = useSelector((state) => state.portfolio, shallowEqual);

  const [displayBasic, setDisplaySearch] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);

  //listen field changes
  const s = watch('s');
  const onSelectStock = React.useCallback((data) => {
    setDisplaySearch(false);
    const { symbol } = data.value;
    navigate(`/stock/${symbol}`, true);
  }, []);
  const selectedPortfolio = React.useMemo(() => portfolio.map(({ symbol }) => symbol), [portfolio]);
  const search = React.useCallback(async (s) => {
    if (s) {
      try {
        setLoading(true);

        setList([]);
        let { bestMatches } = await av.data.search(s);
        bestMatches = bestMatches.map((data) => av.util.polish(data));
        setList(bestMatches);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else {
      setList([]);
    }
  }, []);

  return (
    <>
      <header className="header p-flex-row p-d-flex p-justify-between">
        <div>
          {path != '/' && (
            <Button
              className="p-button-text"
              onClick={() => {
                navigate('/', true);
              }}
              icon="pi pi-chevron-left"
            />
          )}
        </div>
        <div className="stock-search">
          Buscar ações
          <Button className="p-button-text" onClick={() => setDisplaySearch(true)} icon="pi pi-search" />
        </div>
      </header>
      <div className="p-p-4">{Routes}</div>
      <Dialog
        header={
          <form className="p-col-12" onSubmit={handleSubmit(({ s }) => search(s))}>
            <input placeholder="Pesquisar Ações" ref={register} className="p-inputtext " name="s" />
            <Button className="p-ml-2" icon="pi pi-search" />
          </form>
        }
        visible={displayBasic}
        style={{ maxWidth: 768, height: '90vh' }}
        onHide={() => setDisplaySearch(false)}
      >
        <DataTable value={list} className="p-col-12 p-x-5" onSelectionChange={onSelectStock} selectionMode="single">
          <Column
            colSpan={1}
            header={
              s ? (loading ? 'Carregando...' : list.length ? 'Resultados' : `Nenhum resultado para ${s}`) : 'Digite uma ação para pesquisar'
            }
            body={(data) => <StockItem data={data} selectedPortfolio={selectedPortfolio.includes(data.symbol)} />}
          />
        </DataTable>
      </Dialog>
    </>
  );
};

export default Navigation;
export const StockItem = ({ data, inPortfolio, onClick }) => {
  return (
    <div className="p-card p-mt-2" onClick={onClick}>
      <div className="product-item">
        <div className="product-detail">
          <div className="product-name">{data.name || data.Name}</div>
          <div className="product-description">{data.symbol || data.Symbol}</div>

          <i className="pi pi-flag product-category-icon"></i>
          <span className="product-category">{data.region || data.Region}</span>
        </div>
      </div>
      <div className="product-item p-justify-end">
        <div className="product-action">{inPortfolio && <i className="pi pi-check" />}</div>
      </div>
    </div>
  );
};
