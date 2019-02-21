import React, { Component } from 'react'

import axios from '../../axios'

import { Card, Table } from 'antd'

import style from './index.module.less'

export default class BasicTable extends Component {
  state = {
    dataSource2: []
  }
  request = () => {
    axios.ajax({
      url: '/table/list',
      method: 'get',
      data: {
        params: {
          page: 1
        },
        // isShowLoading: false // 默认有全局请求loading
      }
    }).then(res => {
      this.setState({
        dataSource2: res.result
      })
    })
  }
  componentDidMount() {
    const dataSource = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '1',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'Licy',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      }
    ]
    this.setState({
      dataSource
    })
    this.request() // 初始化
  }
  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render (sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render (state) {
          let config = {
            '1': '咸鱼一条',
            '2': '奉化浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业'
          }
          return config[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render (interest) {
          let config = {
            '1': '游泳',
            '2': '篮球',
            '3': '足球',
            '4': '跑步',
            '5': '爬山',
            '6': 'coding',
            '7': '唱歌',
            '8': '桌球',
            '9': '舞蹈',
            '10': '魅力'
          }
          return config[interest]
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    return (
      <div>
        <Card title='基础表格' className={style['mb20']}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title='动态数据渲染表格'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
      </div>
    )
  }
}