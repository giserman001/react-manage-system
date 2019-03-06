import React, { Component } from 'react'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from '../App'
import Login from '../pages/login'
import Admin from '../admin'

// 首页
import Home from '../pages/home'

// ui
import Buttons from '../pages/ui/buttons'
import Modals from '../pages/ui/modals'
import Loadings from '../pages/ui/loadings'
import Notification from '../pages/ui/notification'
import Message from '../pages/ui/message'
import Tab from '../pages/ui/tabs'
import Gallery from '../pages/ui/gallery'
import Carousels from '../pages/ui/carousel'

// form
import LoginFrom from '../pages/form/login'
import RegisterForm from '../pages/form/register'

// table
import BasicTable from '../pages/table/basicTable'
import Hightable from '../pages/table/hightable'

//城市管理
import City from '../pages/city/index'

//订单管理
import Order from '../pages/order/index'

//common
import Common from '../common'

// 订单详情
import Detail from '../pages/order/detail'

// 员工管理
import User from '../pages/user'

// 车辆地图
import BikeMap from '../pages/map/bikeMap'

// 图表-柱形图
import Bar from '../pages/echarts/bar/index'

// 图表-饼图
import Pie from '../pages/echarts/pie'

// 图表-柱形图
import BrokenLine from '../pages/echarts/brokenLine'

// 权限
import Permission from '../pages/permission'

// 权限
import Rich from '../pages/rich'



import NoMatch from '../pages/noMatch'
export default class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/common' render={() => {
              return (
                <Common>
                  <Switch>
                    <Route path='/common/order/detail/:orderId' exact component={Detail}></Route>
                  </Switch>
                </Common>
              )
            }} />
            {/* 两种方式跳home页面 */}
            {/* <Route path='/' exact render={() => {
              return (
                <Redirect to='/home'></Redirect>
              )
            }}></Route> */}
            <Route path='/' render={() => {
              return (
                <Admin>
                  <Switch>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/ui/buttons' component={Buttons}></Route>
                    <Route path='/ui/modals' component={Modals}></Route>
                    <Route path='/ui/loadings' component={Loadings}></Route>
                    <Route path='/ui/notification' component={Notification}></Route>
                    <Route path='/ui/messages' component={Message}></Route>
                    <Route path='/ui/tabs' component={Tab}></Route>
                    <Route path='/ui/gallery' component={Gallery}></Route>
                    <Route path='/ui/carousel' component={Carousels}></Route>
                    <Route path='/form/login' component={LoginFrom}></Route>
                    <Route path='/form/reg' component={RegisterForm}></Route>
                    <Route path='/table/basic' component={BasicTable}></Route>
                    <Route path='/table/high' component={Hightable}></Route>
                    <Route path='/city' component={City}></Route>
                    <Route path='/order' component={Order}></Route>
                    <Route path='/user' component={User}></Route>
                    <Route path='/bikeMap' component={BikeMap}></Route>
                    <Route path='/charts/bar' component={Bar}></Route>
                    <Route path='/charts/pie' component={Pie}></Route>
                    <Route path='/charts/line' component={BrokenLine}></Route>
                    <Route path='/permission' component={Permission}></Route>
                    <Route path='/rich' component={Rich}></Route>
                    <Redirect to='/home'></Redirect>
                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              )
            }}></Route>
          </Switch>
        </App>
      </Router>
    )
  }
}