import React, { Component } from 'react'

import { Card } from 'antd'

import echartsTheme from '../echartTheme'

// 这种方式导入了所有组件（不推荐）
// import echarts from 'echarts'


// 按需加载组件（推荐）
import echarts from 'echarts/lib/echarts' //首先导入基础类

// 基础部分组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

// 导入柱形图组件
import 'echarts/lib/chart/bar'

import ReactEcharts from 'echarts-for-react'


export default class Bar extends Component {
  // 注意：这里主题必须在willmount加载
  componentWillMount() {
    // 注入主题色
    echarts.registerTheme('React', echartsTheme)
  }
  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'bar',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
        }
      ]
    }
    return option;
  }
  getOption2() {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['OFO', '摩拜', '小蓝']
      },
      xAxis: {
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO',
          type: 'bar',
          data: [2000,3000,5500,7000,8000,12000,20000]
        },
        {
          name: '摩拜',
          type: 'bar',
          data: [1500,3000,4500,6000,8000,10000,15000]
        },
        {
          name: '小蓝',
          type: 'bar',
          data: [1000,2000,2500,4000,6000,7000,8000]
        }
      ]
    }
    return option;
  }
  render() {
    return (
      <div>
        <Card title="柱形图表之一">
          <ReactEcharts option={this.getOption()} theme="React" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
        </Card>
        <Card title="柱形图表之二" style={{ marginTop: 10 }}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}