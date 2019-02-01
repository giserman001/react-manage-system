import React, { Component } from 'react'
import style from './index.module.less'

export default class Home extends Component {
  render() {
    return (
      <div className={style['home-wrap']}>
        欢迎学习XXXXX后台管理系统
      </div>
    )
  }
}