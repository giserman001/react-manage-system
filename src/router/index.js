import React, { Component } from 'react'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import App from '../App'
import Login from '../pages/login'
import Admin from '../admin'


import Buttons from '../pages/ui/buttons'
import Modals from '../pages/ui/modals'
import Loadings from '../pages/ui/loadings'
import Notification from '../pages/ui/notification'
import Message from '../pages/ui/message'
import Tab from '../pages/ui/tabs'
import Gallery from '../pages/ui/gallery'
import Carousels from '../pages/ui/carousel'

import NoMatch from '../pages/noMatch'
export default class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' render={(match) => {
            console.log(match, '我有啥参数？')
            return (
              <Admin>
                <Switch>
                  <Route path='/admin/ui/buttons' component={Buttons}></Route>
                  <Route path='/admin/ui/modals' component={Modals}></Route>
                  <Route path='/admin/ui/loadings' component={Loadings}></Route>
                  <Route path='/admin/ui/notification' component={Notification}></Route>
                  <Route path='/admin/ui/messages' component={Message}></Route>
                  <Route path='/admin/ui/tabs' component={Tab}></Route>
                  <Route path='/admin/ui/gallery' component={Gallery}></Route>
                  <Route path='/admin/ui/carousel' component={Carousels}></Route>
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            )
          }}></Route>
          <Route path='/order/detail' component={Login}></Route>
        </App>
      </Router>
    )
  }
}