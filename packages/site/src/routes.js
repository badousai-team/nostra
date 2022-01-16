import React from 'react'
import { Switch, Route } from 'react-router-dom'

import CreateEvent from './pages/create-event'
import Home from './pages/home'
import EventDetail from './pages/event-detail'

export const Routes = () => (
  <Switch>
    <Route path="/create-event" component={CreateEvent} />
    <Route path="/event-detail" component={EventDetail} />
    <Route component={Home} />
  </Switch>
)
