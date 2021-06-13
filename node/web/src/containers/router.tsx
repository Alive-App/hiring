import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { AddStock } from '../pages/add-stock'
import { Home } from '../pages/home'

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/add-stock" component={AddStock} />
    </Switch>
  </BrowserRouter>
)
