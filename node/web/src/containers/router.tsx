import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { AddStock } from '../pages/add-stock'
import { Home } from '../pages/home'
import { Gains } from '../pages/gains'
import { Details } from '../pages/details'

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/add-stock" component={AddStock} />
      <Route path="/:stockName/details" component={Details} />
      <Route path="/:stockName/gains" component={Gains} />
    </Switch>
  </BrowserRouter>
)
