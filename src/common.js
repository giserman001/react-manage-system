import React, { Component, Fragment } from 'react'
import { Row } from 'antd'
import './style/common.less'

import Header from './components/header'


export default class Common extends Component {
  render() {
    return (
      <Fragment>
        <Row className="simple-page">
          <Header meanType="second" />
        </Row>
        <Row className="content">
          {this.props.children}
        </Row>
      </Fragment>
    )
  }
}