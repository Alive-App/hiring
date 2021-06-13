import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { AddStock } from '../pages/add-stock'
import { Home } from '../pages/home'
import { Details } from '../pages/details'

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/add-stock" component={AddStock} />
      <Route path="/:stockName/details" component={Details} />
    </Switch>
  </BrowserRouter>
)
