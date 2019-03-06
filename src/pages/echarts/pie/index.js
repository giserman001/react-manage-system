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
import 'echarts/lib/chart/pie'

import ReactEcharts from 'echarts-for-react'


export default class Pie extends Component {
  // 注意：这里主题必须在willmount加载
  componentWillMount() {
    // 注入主题色
    echarts.registerTheme('React', echartsTheme)
  }
  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: '55%',
          center: [
            '50%', '60%'
          ],
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 1000,
              name: '周二'
            },
            {
              value: 2000,
              name: '周三'
            },
            {
              value: 1500,
              name: '周四'
            },
            {
              value: 3000,
              name: '周五'
            },
            {
              value: 2000,
              name: '周六'
            },
            {
              value: 1200,
              name: '周日'
            },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option;
  }
  getOption2() {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '80%'],
          center: [
            '50%', '60%'
          ],
          data: [
            {
              value: 1000,
              name: '周一'
            }, {
              value: 1000,
              name: '周二'
            }, {
              value: 2000,
              name: '周三'
            }, {
              value: 1500,
              name: '周四'
            }, {
              value: 3000,
              name: '周五'
            }, {
              value: 2000,
              name: '周六'
            }, {
              value: 1200,
              name: '周日'
            }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option;
  }
  getOption3() {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: '55%',
          center: [
            '50%', '50%'
          ],
          data: [
            {
              value: 1000,
              name: '周一'
            }, {
              value: 1000,
              name: '周二'
            }, {
              value: 2000,
              name: '周三'
            }, {
              value: 1500,
              name: '周四'
            }, {
              value: 3000,
              name: '周五'
            }, {
              value: 2000,
              name: '周六'
            }, {
              value: 1200,
              name: '周日'
            }
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    }
    return option;
  }
  render() {
    return (
      <div>
        <Card title="饼形图表之一">
          <ReactEcharts
            option={this.getOption()}
            theme="Imooc"
            notMerge={true}
            lazyUpdate={true}
            style={{ height: 500 }} />
        </Card>
        <Card title="饼形图之二" style={{ marginTop: 10 }}>
          <ReactEcharts
            option={this.getOption2()}
            theme="Imooc"
            notMerge={true}
            lazyUpdate={true}
            style={{ height: 500 }} />
        </Card>
        <Card title="饼形图之三" style={{ marginTop: 10 }}>
          <ReactEcharts
            option={this.getOption3()}
            theme="Imooc"
            notMerge={true}
            lazyUpdate={true}
            style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}