import React, { Component } from 'react'

import style from './index.module.less'
import axios from './../../axios/index'
// import util from '../../utils/util';

import BaseForm from '../../components/baseForm'

import { Card } from 'antd'

export default class BikeMap extends Component {
  state = {}
  params = {
    page: 1
  }
  map = {}
  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      width: 100,
      initialValue: '0',
      list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '上海' }]
    },
    {
      type: '时间查询'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      width: 120,
      initialValue: '0',
      list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '行程结束' }]
    }
  ]
  handleFilterSubmit = (params) => {
    this.params = Object.assign(this.params, params)
    this.requestlist()
  }
  componentDidMount() {
    this.requestlist()
  }
  requestlist = () => {
    let _this = this
    axios.ajax({
      url: '/bike/mapList',
      data: {
        params: this.params
      }
    }).then(res => {
      if (res.code === 0) {
        _this.setState({
          total_count: res.result.total_count
        })
        _this.renderMap(res.result)
      }
    })
  }
  // 渲染地图数据
  renderMap = (res) => {
    let list = res.route_list
    this.map = new window.BMap.Map('containter', { enableMapClick: false })
    let gps1 = list[0].split(',');
    let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
    let gps2 = list[list.length - 1].split(',');
    let endPoint = new window.BMap.Point(gps2[0], gps2[1]);

    this.map.centerAndZoom(endPoint, 11);
    // map.clearOverlays();

    //添加起始图标
    let startPointIcon = new window.BMap.Icon("/assets/start_point.png", new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    });

    var bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon });
    this.map.addOverlay(bikeMarkerStart);

    let endPointIcon = new window.BMap.Icon("/assets/end_point.png", new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    });
    var bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon });
    this.map.addOverlay(bikeMarkerEnd);
    let routeList = [];
    list.forEach((item) => {
      let p = item.split(",");
      let point = new window.BMap.Point(p[0], p[1]);
      routeList.push(point);
    })
    // 行驶路线
    var polyLine = new window.BMap.Polyline(routeList, {
      strokeColor: "#ef4136",
      strokeWeight: 3,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyLine);
    // 服务区路线
    let serviceList = res.service_list;
    let servicePointist = [];
    serviceList.forEach((item) => {
      let point = new window.BMap.Point(item.lon, item.lat);
      servicePointist.push(point);
    })
    // 画线
    var polyServiceLine = new window.BMap.Polyline(servicePointist, {
      strokeColor: "#ef4136",
      strokeWeight: 3,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyServiceLine);
    // 添加地图中的自行车
    let bikeList = res.bike_list;
    let bikeIcon = new window.BMap.Icon("/assets/bike.jpg", new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    });
    bikeList.forEach((item) => {
      let p = item.split(",");
      let point = new window.BMap.Point(p[0], p[1]);
      var bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
      this.map.addOverlay(bikeMarker);
    })
    // 添加地图控件
    this.addMapControl();
  }
  // 添加地图控件
  addMapControl = () => {
    let map = this.map;
    // 左上角，添加比例尺
    var top_right_control = new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT });
    var top_right_navigation = new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT });
    //添加控件和比例尺
    map.addControl(top_right_control);
    map.addControl(top_right_navigation);
    map.enableScrollWheelZoom(false);
    // legend.addLegend(map);
  };
  render() {
    return (
      <div>
        <Card className={style['mb20']}>
          <BaseForm
            formList={this.formList}
            filterSubmit={this.handleFilterSubmit}
          />
        </Card>
        <Card>
          <div className={style['mb20']}>共<i style={{color:'red',margin: '0 10px'}}>100</i>辆</div>
          <div id="containter" style={{ height: 500 }}></div>
        </Card>
      </div>
    )
  }
}