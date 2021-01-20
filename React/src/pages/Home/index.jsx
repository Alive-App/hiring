import React from 'react';
import { useForm } from 'react-hook-form';
import debounce from 'tiny-debounce';
import { av } from '../../utils/api';
import { DataScroller } from 'primereact/datascroller';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import './styles.scss';
const Home = () => {
  const portfolio = useSelector((state) => state.portfolio);
  const { register, handleSubmit, watch } = useForm();
  // const [showSearch, setShowSearch] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);

  //listem field changes
  const s = watch('s');
  console.log({ s });

  const search = React.useCallback(async (s) => {
    console.log('called', s);
    if (s) {
      try {
        setLoading(true);
        setList([]);
        let { bestMatches } = await av.data.search(s);
        bestMatches = bestMatches.map(({ '1. symbol': symbol, '2. name': name, '4. region': region }) => ({ symbol, name, region }));
        console.log({ bestMatches });
        setList(bestMatches);

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else {
      setList([]);
    }
  }, []);

  const selectedPortfolio = React.useMemo(() => portfolio.map(({ symbol }) => symbol), [portfolio]);

  const itemTemplate = React.useCallback(
    (data) => {
      return;
    },
    [selectedPortfolio],
  );
  //debounce search
  const debounceSearch = React.useCallback(debounce(search, 1000), []);

  React.useEffect(() => debounceSearch(s), [s]);

  return (
    <div className="p-mt-4">
      <form className="p-col-12" onSubmit={handleSubmit(({ s }) => search(s))}>
        <input placeholder="Pesquisar Ações" ref={register} className="p-inputtext " name="s" />
      </form>

      <div className="datascroller-demo p-col-12">
        <div className="card p-col-12">
          <DataTable
            value={list}
            className="p-col-12 p-x-5"
            onSelectionChange={(e) => {
              alert('selecionou');
            }}
            selectionMode="single"
            // itemTemplate={itemTemplate}
            // rows={5}
            header={
              s ? (loading ? 'Carregando...' : list.length ? 'Resultados' : `Nenhum resultado para ${s}`) : 'Digite uma ação para pesquisar'
            }
          >
            <Column
              colSpan={1}
              header={() => null}
              body={(data) => (
                <div className="product-item">
                  <div className="product-detail">
                    <div className="product-name">{data.name}</div>
                    <div className="product-description">{data.symbol}</div>

                    <i className="pi pi-flag product-category-icon"></i>
                    <span className="product-category">{data.region}</span>
                  </div>
                </div>
              )}
            />
            <Column
              colspan={3}
              header={() => null}
              body={(data) => (
                <div className="product-item p-justify-end">
                  <div className="product-action">
                    {selectedPortfolio.includes(data.symbol) ? (
                      <i className="pi pi-check" />
                    ) : (
                      <Button icon="pi pi-plus" label="Portfolio" disabled={data.inventoryStatus === 'OUTOFSTOCK'} />
                    )}
                  </div>
                </div>
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Home;
