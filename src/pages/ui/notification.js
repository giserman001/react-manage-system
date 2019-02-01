import React, { Component } from 'react'
import { Card, Button, notification  } from 'antd'
import style from './index.module.less'

export default class Notification extends Component {
  openNotification = (type, direction) => {
    if (direction) {
      // 还提供了一个全局配置方法，在调用前提前配置，全局一次生效
      notification.config({
        placement: direction
      })
    }
    notification[type]({
      message: '发工资了',
      description: '今天发项目奖金了'
    })
  }
  render() {
    return (
      <div>
        <Card title='通知提醒框' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Button type='primary' onClick={() => {this.openNotification('success')}}>success</Button>
          <Button type='primary' onClick={() => {this.openNotification('info')}}>info</Button>
          <Button type='primary' onClick={() => {this.openNotification('warning')}}>warning</Button>
          <Button type='primary' onClick={() => {this.openNotification('error')}}>error</Button>
        </Card>
        <Card title='通知提醒框出现位置配置' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Button type='primary' onClick={() => {this.openNotification('success', 'topLeft')}}>success</Button>
          <Button type='primary' onClick={() => {this.openNotification('info', 'topRight')}}>info</Button>
          <Button type='primary' onClick={() => {this.openNotification('warning', 'bottomLeft')}}>warning</Button>
          <Button type='primary' onClick={() => {this.openNotification('error', 'bottomRight')}}>error</Button>
        </Card>
      </div>
    )
  }
}