import React, { Component } from 'react'
import axios from '../../axios'

import { Card, Table, Modal, Button, message, Badge } from 'antd'

import style from './index.module.less'
// import util from '../../utils/util';
export default class HightTable extends Component {
  state = {

  }
  params = {
    page: 1
  }
  componentDidMount() {
    this.request()
  }
  request = () => {
    let _this = this
    axios.ajax({
      url: '/table/high/list',
      method: 'get',
      data: {
        params: {
          page: _this.params.page
        },
        // isShowLoading: false // 默认有全局请求loading
      }
    }).then(res => {
      this.setState({
        dataSource2: res.result.list.map((item, index) => {
          item.key = index
          return item
        })
      })
    })
  }
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortOrder: sorter.order
    })
  }
  handleDelete = (item) => {
    let id = item.id
    console.log(id)
    Modal.confirm({
      title: '确认',
      content: '确认要删除此条数据吗？',
      onOk: () => {
        message.success('删除成功')
        this.request()
      }
    })
  }
  render() {
    const columns = [
      {
        title: 'id',
        width: 80,
        dataIndex: 'id'
      },
      {
        title: '用户名',
        width: 80,
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
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
        width: 80,
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
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        width: 120,
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        width: 80,
        dataIndex: 'time'
      }
    ]
    const columns2 = [
      {
        title: 'id',
        width: 80,
        fixed: 'left',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        width: 80,
        fixed: 'left',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        width: 80,
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者'
          }
          return config[state];
        }
      },
      {
        title: '爱好',
        width: 80,
        dataIndex: 'interest',
        render(abc) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸'
          }
          return config[abc];
        }
      },
      {
        title: '生日',
        width: 120,
        key: '1',
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 120,
        key: '2',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '3',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '4',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '5',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '6',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '7',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '8',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '9',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '10',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '11',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '12',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '13',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '14',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '15',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '16',
        dataIndex: 'birthday'
      }, {
        title: '生日',
        width: 120,
        key: '17',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        width: 120,
        fixed: 'right',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        width: 80,
        fixed: 'right',
        dataIndex: 'time'
      }
    ]
    const columns3 = [
      {
        title: 'id',
        width: 80,
        dataIndex: 'id'
      },
      {
        title: '用户名',
        width: 80,
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter: (a, b) => {
          return a.age-b.age
        },
        sortOrder: this.state.sortOrder,
        width: 80
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
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
        width: 80,
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
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        width: 120,
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        width: 80,
        dataIndex: 'time'
      }
    ]
    const columns4 = [
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
        title: '年龄',
        dataIndex: 'age'
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
            '1': <Badge status="success" text="游泳" />,
            '2': <Badge status="error" text="篮球" />,
            '3': <Badge status="default" text="足球" />,
            '4': <Badge status="processing" text="跑步" />,
            '5': <Badge status="warning" text="爬山" />,
            '6': <Badge status="success" text="coding" />,
            '7': <Badge status="success" text="唱歌" />,
            '8': <Badge status="success" text="桌球" />,
            '9': <Badge status="success" text="舞蹈" />,
            '10': <Badge status="success" text="魅力" />
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
        title: '操作',
        render: (text, item) => {
          return <Button size='small' onClick={() => {this.handleDelete(item)}}>删除</Button>
        }
      }
    ]
    return (
      <div>
        <Card title='头部固定' className={style['mb20']}>
          <Table
            bordered
            scroll={{ y: 240 }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title='左侧固定' className={style['mb20']}>
          <Table
            bordered
            scroll={{ x: 2650, y: 240 }}
            columns={columns2}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title='表格排序' className={style['mb20']}>
          <Table
            bordered
            scroll={{ y: 240 }}
            columns={columns3}
            dataSource={this.state.dataSource2}
            onChange={this.handleChange}
            pagination={false}
          />
        </Card>
        <Card title='操作按钮' className={style['mb20']}>
          <Table
            bordered
            columns={columns4}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
      </div>
    )
  }
}