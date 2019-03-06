import React, { Component } from 'react'
// import style from './index.module.less'
// import axios from './../../axios/index';
import util from '../../utils/util';

import { Button, Form, Select, DatePicker, Input, Checkbox } from 'antd';
const FormItem = Form.Item;
class FilterForm extends Component {
  initFormList = () => {
    const { getFieldDecorator } = this.props.form
    const formList = this.props.formList
    const formItemList = []
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let label = item.label
        let field = item.field
        let initialValue = item.initialValue || ''
        let placeholder = item.placeholder
        let width = item.width
        if (item.type === '时间查询') {
          const begin_time = <FormItem label="订单时间" key="begin_time">
            {
              getFieldDecorator('begin_time')(
                <DatePicker style={{ width: width }} format="YYYY-MM-DD HH:mm:ss" showTime={true} placeholder={placeholder} />
              )
            }
          </FormItem>
          formItemList.push(begin_time)
          // colon 去掉冒号
          const end_time = <FormItem label="~" colon={false} key="end_time">
            {
              getFieldDecorator('end_time')(
                <DatePicker style={{ width: width }} format="YYYY-MM-DD HH:mm:ss" showTime={true} placeholder={placeholder} />
              )
            }
          </FormItem>
          formItemList.push(end_time)
        } else if (item.type === 'INPUT') {
          const INPUT = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Input type='text' placeholder={placeholder} />
              )
            }
          </FormItem>
          formItemList.push(INPUT)
        } else if (item.type === 'SELECT') {
          const SELECT = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Select
                  style={{ width: width }}
                  placeholder={placeholder}
                >
                  {
                    util.getOptionList(item.list)
                  }
                </Select>
              )
            }
          </FormItem>
          formItemList.push(SELECT)
        } else if (item.type === 'CHECKBOX') {
          const CHECKBOX = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                valuePropName: 'checked',
                initialValue: initialValue // TRUE FALSE
              })(
                <Checkbox>
                  {label}
                </Checkbox>
              )
            }
          </FormItem>
          formItemList.push(CHECKBOX)
        } else if (item.type === 'DATEPICKER') {
          const DATEPICKER = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field])(
                <DatePicker style={{ width: width }} format="YYYY-MM-DD HH:mm:ss" showTime={true} placeholder={placeholder} />
              )
            }
          </FormItem>
          formItemList.push(DATEPICKER)
        }
      })
    }
    return formItemList
  }
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue()
    this.props.filterSubmit(fieldsValue)
  }
  reset = () => {
    this.props.form.resetFields();
  }
  render() {
    return (
      <Form layout="inline">
        {this.initFormList()}
        <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
        <Button onClick={this.reset}>重置</Button>
      </Form>
    )
  }
}
export default Form.create({})(FilterForm)