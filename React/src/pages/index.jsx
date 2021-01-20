import React from 'react';
import Home from './Home';
import { useRoutes } from 'hookrouter';

const routes = {
  '/': (props) => <Home {...props} />,
};
// import { Container } from './styles';

const Navigation = () => {
  const Routes = useRoutes(routes);
  return Routes;
};

export default Navigation;
