import React, { Component } from 'react'
import style from './index.module.less'
import axios from './../../axios/index';
import util from '../../utils/util';

import BaseForm from '../../components/baseForm'
import ETable from '../../components/ETable'

import { Card, Button, Modal, Form, Radio, DatePicker, Select, Input } from 'antd';
import moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option
export default class User extends Component {
  state = {
    list: [] //列表
  }
  params = {
    page: 1
  }
  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      placeholder: '请输入用户名',
      field: 'user_name',
      width: 100
    },
    {
      type: 'INPUT',
      label: '手机号',
      placeholder: '请输入手机号',
      field: 'user_mobile',
      width: 100
    },
    {
      type: 'DATEPICKER',
      label: '入职日期',
      placeholder: '请输入日期',
      field: 'user_date',
      width: 150
    }
  ]
  componentDidMount() {
    this.requestList()
  }
  requestList = () => {
    // 请求列表
    axios.requestList(this, '/user/list', this.params, true)
  }
  handleFilter = (params) => {
    this.params = Object.assign(this.params, params)
    this.requestList()
  }
  handleOperator = (type) => {
    let item = this.state.selectedItem
    switch (type) {
      case 'create':
        this.setState({
          type,
          isVisivle: true,
          title: '创建员工'
        })
        break;
      case 'edit':
        if (!item) {
          Modal.info({
            title: "提示",
            content: "请选择一个用户"
          })
          return
        }
        this.setState({
          type,
          isVisivle: true,
          title: '编辑员工',
          userInfo: item
        })
        break;
      case 'detail':
        if (!item) {
          Modal.info({
            title: "提示",
            content: "请选择一个用户"
          })
          return
        }
        this.setState({
          type,
          isVisivle: true,
          title: '员工详情',
          userInfo: item
        })
        break;
      case 'delete':
      if (!item) {
        Modal.info({
          title: "提示",
          content: "请选择一个用户"
        })
        return
      }
      Modal.confirm({
        title:'确认删除',
        content: '是否要删除当前选中的员工',
        onOk:() => {
          let _this = this
          axios.ajax({
            url: '/user/delete',
            data: {
              params:item.id
            }
          }).then(res => {
            if (res.code === 0){
              _this.setState({
                isVisivle: false
              })
              _this.requestList()
            }
          })
        }
      })
        break;
    }
  }
  handleSubmit = () => {
    let type = this.state.type
    let data = this.userForm.props.form.getFieldsValue()
    let _this = this
    console.log(type, data)
    axios.ajax({
      url: type === 'create' ? '/user/add' : '/user/edit',
      data: {
        params: data
      }
    }).then(res => {
      if (res.code === 0) {
        _this.userForm.props.form.resetFields();// 重置表单
        _this.setState({
          isVisivle: false
        })
        _this.requestList()
      }
    })
  }
  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'username'
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
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者'
          }
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
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
          return config[interest];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '联系地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    let footer = {} // 这里不能用 const
    if (this.state.type === 'detail') {
      footer = {
        footer: null
      }
    }
    return (
      <div>
        <Card className={style['mb20']}>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card className={style['card-wraper']}>
          <Button type="primary" icon="plus" onClick={() => this.handleOperator('create')}>创建员工</Button>
          <Button icon="edit" onClick={() => this.handleOperator('edit')}>编辑员工</Button>
          <Button onClick={() => this.handleOperator('detail')}>员工详情</Button>
          <Button type="danger" icon="delete" onClick={() => this.handleOperator('delete')}>删除员工</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            columns={columns}
            updateSelectedItem={util.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisivle}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.userForm.props.form.resetFields();// 重置表单
            this.setState({
              isVisivle: false
            })
          }}
          width={600}
          {...footer}
        >
          <UserForm
            type={this.state.type}
            userInfo={this.state.userInfo}
            wrappedComponentRef={(form) => { this.userForm = form }}
          />
        </Modal>
      </div>
    )
  }
}

class UserForm extends Component {
  getState = (state) => {
    let config = {
      '1': '咸鱼一条',
      '2': '风华浪子',
      '3': '北大才子一枚',
      '4': '百度FE',
      '5': '创业者'
    }
    return config[state];
  }
  render() {
    let type = this.props.type
    let userInfo = this.props.userInfo || {}
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    }
    return (
      <Form layout="horizontal">
        <FormItem label="用户名" {...formItemLayout}>
          {
            type === 'detail' ? userInfo.username :
              getFieldDecorator('user_name', {
                initialValue: userInfo.username
              })(
                <Input type="text" placeholder="请输入用户名" />
              )
          }
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {
            type === 'detail' ? userInfo.sex === 1 ? '男' : '女' :
              getFieldDecorator('sex', {
                initialValue: userInfo.sex
              })(
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </RadioGroup>
              )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            type === 'detail' ? this.getState(userInfo.state) :
              getFieldDecorator('state', {
                initialValue: userInfo.state
              })(
                <Select>
                  <Option value={1}>咸鱼一角</Option>
                  <Option value={2}>风华才子</Option>
                  <Option value={3}>北大才子</Option>
                  <Option value={4}>百度FE</Option>
                  <Option value={5}>北斗七星</Option>
                </Select>
              )
          }
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          {
            type === 'detail' ? userInfo.birthday :
              getFieldDecorator('birthday', {
                initialValue: userInfo.birthday ? moment(userInfo.birthday) : ''
              })(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )
          }
        </FormItem>
        <FormItem label="联系地址" {...formItemLayout}>
          {
            type === 'detail' ? userInfo.address :
              getFieldDecorator('address', {
                initialValue: userInfo.address
              })(
                <TextArea
                  rows={3}
                  placeholder="请输入联系地址"
                />
              )
          }
        </FormItem>
      </Form>
    )
  }
}
UserForm = Form.create({})(UserForm)