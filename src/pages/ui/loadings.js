import React, { Component } from 'react'
import { Card, Spin, Icon, Alert, Switch } from 'antd'
import style from './index.module.less'

export default class Loadings extends Component {
  state = {
    loading: true
  }
  toggle = (value) => {
    this.setState({ loading: value })
  }
  render() {
    const icon = <Icon type='loading' style={{ fontSize: 24 }} />
    return (
      <div>
        <Card title='Spin用法' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Spin size='small' />
          <Spin style={{ margin: '0 40px' }} />
          <Spin size='large' />
          <Spin indicator={icon} spinning style={{ marginLeft: 40 }} />
        </Card>
        <Card title='内容遮罩' className={style['card-wraper']}>
          <Spin>
            <Alert
              message='React'
              description='欢迎来到React实战课程'
              type='info'
            />
          </Spin>
          <div style={{margin: '20px 0'}}>
            <Spin tip='加载中...' spinning={this.state.loading}>
              <Alert
                message='React'
                description='欢迎来到React实战课程'
                type='warning'
              />
            </Spin>
            <div style={{ marginTop: 16 }}>
              Loading state：<Switch checked={this.state.loading} onChange={this.toggle} />
            </div>
          </div>
          <Spin indicator={icon}>
            <Alert
              message='React'
              description='欢迎来到React实战课程'
              type='info'
            />
          </Spin>
        </Card>
      </div>
    )
  }
}