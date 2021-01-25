import { usePath } from 'hookrouter';
import { Button } from 'primereact/button';
import React from 'react';
import { SearchContext } from '../../pages';

function Header() {
  const path = usePath();
  const { open } = React.useContext(SearchContext);

  return (
    <header id="header" className="header p-flex-row p-d-flex p-justify-between">
      <div>
        {path != '/' && (
          <Button
            className="p-button-text"
            onClick={() => {
              if (window.history.length) window.history.back();
            }}
            icon="pi pi-chevron-left"
          />
        )}
      </div>
      <Button label="Buscar ações"  id="search-btn" className="p-button-outlined" onClick={() => open()} icon="pi pi-search" />
    </header>
  );
}

export default Header;
