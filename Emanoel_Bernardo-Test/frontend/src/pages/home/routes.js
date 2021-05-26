import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Stock from './pages/stocks'
import Home from './pages/home'
//principal


export default function Routes(){
    return (
            <Switch>
                <Route component={Stock} path='/stock/:stock_name' />
                <Route component={Home} path='/' />
            </Switch>
    )
}