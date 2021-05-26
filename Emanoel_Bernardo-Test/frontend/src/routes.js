import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
//principal


export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path='/login' />
                <Route component={Home} path='/' />
            </Switch>
        </BrowserRouter>
    )
}