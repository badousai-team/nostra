import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import Test from './pages/test'

export const Routes = () => (
  <Switch>
    <Route path="/test" component={Test} />
    <Route component={Home} />
  </Switch>
)
