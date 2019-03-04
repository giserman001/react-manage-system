import React, { Component } from 'react'
import style from './index.module.less'
import axios from './../../axios/index';
import util from '../../utils/util';

import BaseForm from '../../components/baseForm'

import { Card, Button, Table, Form, Modal, message } from 'antd';
const FormItem = Form.Item;
export default class Order extends Component {
  state = {
    list: [], //订单列表
    orderInfo: {}, //订单详情
    orderConfirmVisble: false
  }
  params = {
    page: 1
  }
  formList = [
    {
      type: 'SELECT',
      label: '城市',
      placeholder: '全部',
      field: 'city',
      initialValue: '1',
      width:100,
      list:[{id: '0', name: '北京'},{id: '1', name: '天津'},{id: '2', name: '上海'},{id: '3', name: '合肥'}]
    },
    {
      type: '时间查询',
      width:150
    },
    {
      type: 'SELECT',
      label: '订单状态',
      placeholder: '全部',
      field: 'order_status',
      initialValue: '1',
      width:100,
      list:[{id: '0', name: '全部'},{id: '1', name: '进行中'},{id: '2', name: '结束行程'}]
    }
  ]
  componentDidMount() {
    this.requestList()
  }
  handleFilter = (params) => {
    this.params = Object.assign(this.params, params)
    this.requestList()
  }
  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单'
      })
      return;
    }
    // 第一种方法(当前窗口打开)
    // window.location.href = `/#/common/order/detail/${item.id}`
    // 第二种方式（新窗口打开）
    window.open(`/#/common/order/detail/${item.id}`, '_blank')
  }
  requestList = () => {
    // 请求列表
    axios.requestList(this, '/order/list', this.params, true)
  }
  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  // 订单结束确认
  handleConfirm = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      })
      return;
    }
    axios.ajax({
      url: '/order/ebike_info',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      if (res.code === 0) {
        this.setState({
          orderInfo: res.result,
          orderConfirmVisble: true
        })
      }
    })
  }
  // 结束订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      if (res.code === 0) {
        message.success('订单结束成功')
        this.setState({
          orderConfirmVisble: false
        })
        this.requestList();
      }
    })
  }
  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号码',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance'
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ]
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    return (
      <div>
        <Card className={style['mb20']}>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card>
          <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
          <Button type='primary' style={{ marginLeft: 15 }} onClick={this.handleConfirm}>结束订单</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisble}
          onCancel={() => {
            this.setState({
              orderConfirmVisble: false
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
