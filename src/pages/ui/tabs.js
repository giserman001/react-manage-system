import React, { Component } from 'react';
import { Card, message, Tabs, Icon } from 'antd'
import style from './index.module.less'
const TabPane = Tabs.TabPane;

class Tab extends Component {
  newTabIndex = 0
  callback = (key) => {
    message.info('hi, 您选择了页签：' + key)
  }
  componentWillMount() {
    const panes = [
      {
        title: 'Tab 1',
        content: '欢迎学React课程',
        key: '1'
      },
      {
        title: 'Tab 2',
        content: '欢迎学Vue课程',
        key: '2'
      },
      {
        title: 'Tab 3',
        content: '欢迎学Angular课程',
        key: '3'
      }
    ]
    this.setState({
      panes,
      activeKey: panes[0].key
    })
  }
  handleChange = (activeKey) => {
    this.setState({
      activeKey
    })
  }
  handleEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  render() {
    return (
      <div>
        <Card title='Tab页签' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">欢迎学React课程</TabPane>
            <TabPane tab="Tab 2" key="2" disabled>欢迎学Vue课程</TabPane>
            <TabPane tab="Tab 3" key="3">欢迎学Angular课程</TabPane>
          </Tabs>
        </Card>
        <Card title='Tab带图标的页签' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            {/* 这里需要加一个根元素，不然会报错 */}
            <TabPane tab={<span><Icon type='plus' />Tab 1</span>} key="1">欢迎学React课程</TabPane>
            <TabPane tab={<span><Icon type='edit' />Tab 2</span>} key="2">欢迎学Vue课程</TabPane>
            <TabPane tab={<span><Icon type='delete' />Tab 3</span>} key="3">欢迎学Angular课程</TabPane>
          </Tabs>
        </Card>
        <Card title='动态的tab页签' className={`${style['card-wraper']} ${style['mb20']}`}>
          <Tabs
            type="editable-card"
            onChange={this.handleChange}
            activeKey={this.state.activeKey}
            onEdit={this.handleEdit}
          >
            {
              this.state.panes.map((item) => {
                return (
                  <TabPane tab={item.title} key={item.key}>{item.content}</TabPane>
                )
              })
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}

export default Tab