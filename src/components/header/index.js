import React, { Component } from 'react'
import { Row, Col } from 'antd'
import util from '../../utils/util'
import style from './index.module.less'
import axios from '../../axios'
import { connect } from 'react-redux'

class Header extends Component {
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
    let meanType = this.props.meanType
    return (
      <div className={style.header}>
        <Row className={meanType ? style['header-top-simple'] : style['header-top']}>
          {
            meanType ? (
              <Col span={6} className={style.logoBox}>
                <img src="/assets/logo-ant.svg" alt="" />
                <span>React 通用管理系统</span>
              </Col>
            ) : ''
          }
          <Col span={meanType ? 18 : 24}>
            <span>欢迎, {this.state.userName}</span>
            <a className={meanType ? style['commonStyle'] : ''} href='/'>退出</a>
          </Col>
        </Row>
        {
          meanType ? '' : (
            <Row className={style.breadcrumb}>
              <Col span={4} className={style['breadcrumb-title']}>
                { this.props.menuName }
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
          )
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    menuName: state.menuName
  }
}
export default connect(mapStateToProps, null)(Header)