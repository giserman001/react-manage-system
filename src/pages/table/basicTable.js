import React, { Component } from 'react'

import axios from '../../axios'

import { Card, Table, Modal, Button, message } from 'antd'

import style from './index.module.less'
import util from '../../utils/util';

export default class BasicTable extends Component {
  state = {
    dataSource2: [],
    selectedCheckBoxRowKeys: []
  }
  params = {
    page:1
  }
  handleDelete = () => {
    let rows = this.state.selectedRows
    let ids = []
    rows.map(item => {
      ids.push(item.id)
    })
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗？${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功');
        this.request();
      }
    })
  }
  onRowClick = (record, index, event) => {
    let selectKey = [index]
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName} 生日：${record.interest}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  request = () => {
    let _this = this
    axios.ajax({
      url: '/table/list',
      method: 'get',
      data: {
        params: {
          page: _this.params.page
        },
        // isShowLoading: false // 默认有全局请求loading
      }
    }).then(res => {
      res.result.list.map((item, index) => {
        item.key = index
      })
      this.setState({
        dataSource2: res.result.list,
        selectedCheckBoxRowKeys: [],
        selectedRows: null,
        pagination:util.pagination(res, (current) => {
          _this.params.page = current
          _this.request()
        })
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
    dataSource.map((item, index) => {
      item.key = index
    })
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
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
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
        render(interest) {
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
    const { selectedRowKeys, selectedCheckBoxRowKeys } = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys: selectedCheckBoxRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedCheckBoxRowKeys: selectedRowKeys,
          selectedRows
        })
      }
    }
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
        <Card title='动态数据渲染表格-Mock' className={style['mb20']}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title='Mock-单选' className={style['mb20']}>
          <Table
            bordered
            onRow={(record, index) => {
              return {
                onClick: (event) => {
                  this.onRowClick(record, index, event)
                } // 点击行
              };
            }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title='Mock-多选' className={style['mb20']}>
          <div style={{ marginBottom: 10 }}>
            <Button type='primary' onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title='Mock-分页'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    )
  }
}