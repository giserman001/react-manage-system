import React, { Component } from 'react'
import style from './index.module.less'
import { Menu } from 'antd'
import menuConfig from '../../config/menuConfig'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'
import { withRouter } from 'react-router-dom';
const SubMenu = Menu.SubMenu

class NavLeft extends Component {
  state = {
    currentKey: ''
  }
  handleClick = ({ item, key }) => {
    if (key == this.state.currentKey) {
      return false;
    }
    // 通过connect关联redux和组件后才可以从props取出
    const { dispatch } = this.props
    dispatch(switchMenu(item.props.title))
    this.setState({
      currentKey: key
    })
  }
  componentWillMount() {
    console.log(this.props)
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
    const menuTreeNode = this.renderMenu(menuConfig)
    this.setState({
      menuTreeNode,
      currentKey
    })
  }
  homeHandleClick = () => {
    const { dispatch } = this.props;
    dispatch(switchMenu('首页'));
    this.setState({
      currentKey: "/home"
    });
  };
  // 菜单渲染
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      )
    })
  }
  render() {
    return (
      <div>
        <NavLink to="/home" onClick={this.homeHandleClick}>
          <div className={style.logo}>
            <img src='/assets/logo-ant.svg' alt='' />
            <h1>React MS</h1>
          </div>
        </NavLink>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.currentKey]}
          theme='dark'>
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}
export default connect()(withRouter(NavLeft))