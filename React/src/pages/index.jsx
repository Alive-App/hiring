import React from 'react';
import Home from './Home';
import { useRoutes } from 'hookrouter';

import Stock from './Stock';
import Header from '../components/Header';
import SearchDialog from '../components/SearchDialog';

export const SearchContext = React.createContext({ open: () => {}, callback: null, close: () => {}, showing: false });
const routes = {
  '/': (props) => <Home {...props} />,
  '/stock/:id': (props) => <Stock {...props} />,
};
const Navigation = () => {
  const [callback, setCallback] = React.useState(null);
  const [displaySearch, setDisplaySearch] = React.useState(false);

  const Routes = useRoutes(routes);

  const open = React.useCallback((callback) => {
    setCallback(() => callback);
    setDisplaySearch(true);
  }, []);

  const close = React.useCallback(() => {
    if (callback) {
      callback();
      setCallback(() => null);
    }
    setDisplaySearch(false);
  }, [callback]);

  return (
    <SearchContext.Provider value={{ open, close, callback, showing: displaySearch }}>
      <Header />
      <SearchDialog onSearch={callback} />
      <div className="p-p-4">{Routes}</div>
    </SearchContext.Provider>
  );
};

export default Navigation;
