import React, { Component } from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'
import style from './index.module.less'
const FormItem = Form.Item

class LoginFrom extends Component {
  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userInfo.userName}恭喜你，您成功了，当前密码是：${userInfo.passWord}`)
      }
    })
  }
  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form
    return (
      <div>
        <Card title='登陆行内表单' className={style['mb20']}>
          <Form layout='inline'>
            <FormItem>
              <Input placeholder='请输入用户名' />
            </FormItem>
            <FormItem>
              <Input placeholder='请输入密码' />
            </FormItem>
            <FormItem>
              <Button type='primary'>登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title='登陆水平表单' className={style['mb20']}>
          <Form className={style['formWidth']} layout='horizontal'>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    },
                    {
                      min: 5, max: 10,
                      message: '长度不在范围内'
                    },
                    {
                      pattern: new RegExp('^\\w+$', 'g'),
                      // pattern: /^\\w+$/g, 这两种方式都是可以的
                      message: '用户名必须为字母或者数字'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="user" />} placeholder='请输入用户名' />
                )
              }
              {getFieldsValue().userName}
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('passWord', {
                  initialValue: '',
                  rules: []
                })(
                  <Input type='password' prefix={<Icon type="lock" />} placeholder='请输入密码' />
                )
              }
              {getFieldsValue().passWord}
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',// 注意这里
                  initialValue: true
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="#" style={{ float: 'right' }}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type='primary' onClick={this.handleSubmit}>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(LoginFrom);
