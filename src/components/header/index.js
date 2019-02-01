import React, { Component } from 'react'
import { Row, Col } from 'antd'
import util from '../../utils/util'
import style from './index.module.less'
import axios from '../../axios'

export default class Header extends Component {
  state = {}
  componentWillUnMount = () => {
    //2.定时器
    clearInterval(this.timer)
  }
  componentWillMount() {
    this.setState({
      userName: 'giserman001'
    })
    this.timer = setInterval(() => {
      let sysTime = util.formateDate(new Date().getTime())
      this.setState({
        sysTime
      })
    }, 1000)
    this.getWeatherAPIData() // 获取天气
  }
  getWeatherAPIData() {
    let city = '上海';
    axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then((res) => {
      if (res.status === 'success') {
        let data = res.results[0].weather_data[0];
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        })
      }
    })
  }
  render() {
    return (
      <div className={style.header}>
        <Row className={style['header-top']}>
          <Col span={24}>
            <span>欢迎, {this.state.userName}</span>
            <a href='/'>退出</a>
          </Col>
        </Row>
        <Row className={style.breadcrumb}>
          <Col span={4} className={style['breadcrumb-title']}>
            首页
          </Col>
          <Col span={20} className={style.weather}>
            <span className={style.date}>{this.state.sysTime}</span>
            <span className={style['weather-img']}>
              <img alt='' src={this.state.dayPictureUrl} />
            </span>
            <span className={style['weather-detail']}>
              {this.state.weather}
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}