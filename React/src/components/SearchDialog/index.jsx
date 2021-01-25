import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';

import { DataTable } from 'primereact/datatable';

import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { useAPI } from '../../utils/api';
import StockItem from '../StockItem';
import { SearchContext } from '../../pages';
import { navigate } from 'hookrouter';

function SearchDialog({ onSearch }) {
  const { register, handleSubmit, watch } = useForm();
  const { showing, close } = React.useContext(SearchContext);
  const [{ loading }, fetchData] = useAPI('search');
  const [list, setList] = React.useState([]);

  const s = watch('s');

  const onSelectStock = React.useCallback(
    (data) => {
      const { symbol } = data.value;
      navigate(`/stock/${symbol}`);
      close();
    },
    [close],
  );

  const search = React.useCallback(async (s) => {
    if (s) {
      let data = await fetchData({ params: [s] });
      if (data) {
        setList(data);
      }
    }
  }, []);

  return (
    <Dialog id="search-modal" header="Pesquisar" visible={showing} style={{ maxWidth: 768, height: '90vh' }} onHide={close}>
      <form className="p-col-12" onSubmit={handleSubmit(({ s }) => search(s))}>
        <input
          id="search-input"
          disabled={loading}
          autoFocus
          placeholder="Pesquisar Ações"
          ref={register}
          className="p-inputtext "
          name="s"
        />
        <Button disabled={loading} className="p-ml-2" icon="pi pi-search" />
      </form>
      {!!loading && <ProgressBar mode="indeterminate" style={{ height: 5, margin: '0 10px' }} />}
      <DataTable value={list} className="p-col-12 p-x-5" onSelectionChange={onSearch || onSelectStock} selectionMode="single">
        <Column
          header={s ? (list.length ? `Resultados para "${s}"` : `Nenhum resultado para "${s}"`) : 'Digite uma ação para pesquisar'}
          colSpan={1}
          body={(data) => <StockItem data={data} />}
        />
      </DataTable>
    </Dialog>
  );
}

export default SearchDialog;
