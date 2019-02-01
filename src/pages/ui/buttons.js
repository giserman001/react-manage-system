import React, { Component } from 'react';
import { Card, Button, Icon, Radio } from 'antd'
import style from './index.module.less'

class Buttons extends Component {
  state = {
    loading: true,
    size: 'default'
  }
  handleClosedLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }
  handleButtonSize = (e) => {
    this.setState({
      size: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Card title='基础按钮' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Button type='primary'>基础按钮</Button>
          <Button>基础按钮</Button>
          <Button type='dashed'>基础按钮</Button>
          <Button type='danger'>基础按钮</Button>
          <Button disabled>基础按钮</Button>
        </Card>
        <Card title='图形按钮' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Button icon='plus'>创建</Button>
          <Button icon='edit'>编辑</Button>
          <Button icon='delete'>删除</Button>
          <Button shape='circle' icon='search'></Button>
          <Button type='primary' icon='search'>搜索</Button>
          <Button type='primary' icon='download'>下载</Button>
        </Card>
        <Card title='Loading按钮' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Button type='primary' loading={this.state.loading}>确定</Button>
          <Button type='primary' shape='circle' loading={this.state.loading}></Button>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button shape='circle' loading={this.state.loading}></Button>
          <Button type='primary' onClick={this.handleClosedLoading}>点击触发loading</Button>
        </Card>
        <Card title='按钮组' className={style['mb20']}>
          <Button.Group>
            <Button type="primary">
              <Icon type="left" />返回
          </Button>
            <Button type="primary">
              前进<Icon type="right" />
            </Button>
          </Button.Group>
        </Card>
        <Card title='按钮尺寸' className={style['card-wraper']}>
          <Radio.Group value={this.state.size} onChange={this.handleButtonSize}>
            <Radio value='small'>小</Radio>
            <Radio value='default'>中</Radio>
            <Radio value='large'>大</Radio>
          </Radio.Group>
          <Button type="primary" size={this.state.size}>基础按钮</Button>
          <Button type='dashed' size={this.state.size}>基础按钮</Button>
          <Button type='danger' size={this.state.size}>基础按钮</Button>
          <Button disabled size={this.state.size}>基础按钮</Button>
        </Card>
      </div>
    );
  }
}

export default Buttons;
