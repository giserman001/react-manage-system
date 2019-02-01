import React, { Component } from 'react'
import style from './index.module.less'
import { Menu } from 'antd'
import menuConfig from '../../config/menuConfig'
import { NavLink } from 'react-router-dom'
const SubMenu = Menu.SubMenu


export default class NavLeft extends Component {
  componentWillMount () {
    const menuTreeNode = this.renderMenu(menuConfig)
    this.setState({
      menuTreeNode
    })
  }
  // 菜单渲染
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            { this.renderMenu(item.children) }
          </SubMenu>
        )
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{ item.title }</NavLink>
        </Menu.Item>
      )
    })
  }
  render() {
    return (
      <div>
        <div className={style.logo}>
          <img src='/assets/logo-ant.svg' alt='' />
          <h1>Imooc MS</h1>
        </div>
        <Menu
        theme='dark'>
          { this.state.menuTreeNode }
        </Menu>
      </div>
    )
  }
}