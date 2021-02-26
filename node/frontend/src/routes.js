import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Compare from './pages/compare';
import Gain from './pages/gain';
import History from './pages/history';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/compare/:stock" component={Compare} />
      <Route path="/gain/:stock" component={Gain} />
      <Route path="/history/:stock" component={History} />
    </Switch>
  );
}
