import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd'
import style from './index.module.less'

class Modals extends Component {
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false
  }
  handleConfirm = (type) => {
    this.setState({
      [type]: true
    })
  }
  handleConfirm = (type) => {
    Modal[type]({
      title: '确认',
      content: '你确定学会React了吗',
      onOk () {
        console.log('确定')
      },
      onCancel () {
        console.log('取消')
      }
    })
  }
  render() {
    return (
      <div>
        <Card title='基础模态框' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Button type='primary' onClick={() => { this.handleOpen('showModal1') }}>Open</Button>
          <Button type='primary' onClick={() => { this.handleOpen('showModal2') }}>自定义页脚</Button>
          <Button type='primary' onClick={() => { this.handleOpen('showModal3') }}>顶部20px弹框</Button>
          <Button type='primary' onClick={() => { this.handleOpen('showModal4') }}>水平垂直居中</Button>
        </Card>
        <Card title='信息确认框' className={style['card-wraper']}>
          <Button type='primary' onClick={() => { this.handleConfirm('confirm') }}>Confirm</Button>
          <Button type='primary' onClick={() => { this.handleConfirm('info') }}>Info</Button>
          <Button type='primary' onClick={() => { this.handleConfirm('success') }}>Success</Button>
          <Button type='primary' onClick={() => { this.handleConfirm('warning') }}>warning</Button>
        </Card>
        <Modal
          title='React'
          visible={this.state.showModal1}
          onCancel={() => {
            this.setState({
              showModal1: false
            })
          }}>
          <p>学习React MS</p>
        </Modal>
        <Modal
          title='React'
          visible={this.state.showModal2}
          okText='好的'
          cancelText='算了'
          onCancel={() => {
            this.setState({
              showModal2: false
            })
          }}>
          <p>学习React MS</p>
        </Modal>
        <Modal
          title='React'
          className='test'
          visible={this.state.showModal3}
          onCancel={() => {
            this.setState({
              showModal3: false
            })
          }}>
          <p>学习React MS</p>
        </Modal>
        <Modal
          title='React'
          visible={this.state.showModal4}
          wrapClassName='vertical-center-modal'
          onCancel={() => {
            this.setState({
              showModal4: false
            })
          }}>
          <p>学习React MS</p>
        </Modal>
      </div>
    )
  }
}
export default Modals;