import React, { Component } from 'react';
import { Card, Button, message } from 'antd'
import style from './index.module.less'

class Message extends Component {
  showMessage = (type) => {
    message[type]('恭喜你，React课程晋级成功')
  }
  render() {
    return (
      <div>
        <Card title='全局提醒框' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Button onClick={() => {this.showMessage('success')}} type='primary'>Success</Button>
          <Button onClick={() => {this.showMessage('info')}} type='primary'>Info</Button>
          <Button onClick={() => {this.showMessage('warning')}} type='primary'>Warning</Button>
          <Button onClick={() => {this.showMessage('error')}} type='primary'>Error</Button>
          <Button onClick={() => {this.showMessage('loading')}} type='primary'>Loading</Button>
        </Card>
      </div>
    )
  }
}

export default Message