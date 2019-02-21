import React, { Component } from 'react'
import moment from 'moment'
import {
  Card,
  Form,
  Button,
  Select,
  InputNumber,
  Input,
  Radio,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  Icon,
  message,
  Checkbox
} from 'antd'
// import style from './index.module.less'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const OptionItem = Select.Option
const TextArea = Input.TextArea

class RegisterForm extends Component {
  state = {}
  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        userImg:imageUrl,
        loading: false
      }));
    }
  }
  handleSubmit = () => {
    let formData = this.props.form.getFieldsValue()
    console.log(formData)
    message.success(`${formData.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${formData.userPwd}`)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }
    const offsetLayout = {
      wrapperCol : {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }
    const rowObject = { minRows: 2, maxRows: 6 }
    return (
      <div>
        <Card title='注册表单'>
          <Form layout='horizontal'>
            <FormItem label='用户名' {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    }
                  ]
                })(
                  <Input placeholder='请输入用户名' />
                )
              }
            </FormItem>
            <FormItem label='密码' {...formItemLayout}>
              {
                getFieldDecorator('passWord', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空'
                    }
                  ]
                })(
                  <Input placeholder='请输入密码' />
                )
              }
            </FormItem>
            <FormItem label='性别' {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1'
                })(
                  <RadioGroup>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label='年龄' {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label='当前状态' {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '2'
                })(
                  <Select>
                    <OptionItem value='1'>咸鱼一条</OptionItem>
                    <OptionItem value='2'>奉化浪子</OptionItem>
                    <OptionItem value='3'>北大才子</OptionItem>
                    <OptionItem value='4'>百度FE</OptionItem>
                    <OptionItem value='5'>开发者</OptionItem>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label='爱好' {...formItemLayout}>
              {
                getFieldDecorator('hobby', {
                  initialValue: ['2', '5']
                })(
                  <Select mode='multiple'>
                    <OptionItem value='1'>游泳</OptionItem>
                    <OptionItem value='2'>篮球</OptionItem>
                    <OptionItem value='3'>排球</OptionItem>
                    <OptionItem value='4'>跑步</OptionItem>
                    <OptionItem value='5'>coding</OptionItem>
                    <OptionItem value='6'>唱歌</OptionItem>
                    <OptionItem value='7'>骑行</OptionItem>
                    <OptionItem value='8'>写字</OptionItem>
                    <OptionItem value='9'>钢琴</OptionItem>
                    <OptionItem value='10'>二胡</OptionItem>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label='是否已婚' {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Switch />
                )
              }
            </FormItem>
            <FormItem label='生日' {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2018-08-08 12:12:23', 'YYYY-MM-DD HH:mm:ss')
                })(
                  <DatePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'
                  />
                )
              }
            </FormItem>
            <FormItem label='联系地址' {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '北京市海淀区奥林匹克公园'
                })(
                  <TextArea
                    autosize={rowObject}
                  />
                )
              }
            </FormItem>
            <FormItem label='早起时间' {...formItemLayout}>
              {
                getFieldDecorator('time', {
                  initialValue: moment('12:08:23', 'HH:mm:ss')
                })(
                  <TimePicker />
                )
              }
            </FormItem>
            <FormItem label='头像' {...formItemLayout}>
              {
                getFieldDecorator('HeadPortrait')(
                  <Upload
                    listType='picture-card'
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                  >
                  {this.state.userImg ? <img src={this.state.userImg} alt='' /> : <Icon type="plus"/>}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('userImg')(
                  <Checkbox>我已经阅读 <a href='http://www.baidu.com'>慕课协议</a></Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type='primary' onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(RegisterForm);