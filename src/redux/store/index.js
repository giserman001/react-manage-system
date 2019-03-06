/**
 * 引入creatorStore数据源对象
 * */

import { createStore, compose } from 'redux'

import reducer from '../reducer'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f

export default () => createStore(reducer, compose(reduxDevtools))