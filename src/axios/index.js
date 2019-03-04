import JsonP from 'jsonp'
import axios from 'axios'
import { message } from 'antd'
import util from '../utils/util'

export default class Axios {
  // 列表请求封装
  static requestList(_this, url, params, isMock) {
    var data = {
      params
    }
    this.ajax({
      url,
      data,
      isMock
    }).then(res => {
      if (res && res.result) {
        _this.setState({
          list: res.result.item_list.map((item, index) => {
            item.key = index
            return item
          }),
          pagination: util.pagination(res, (current) => {
            _this.params.page = current
            _this.requestList()
          })
        })
      }
    })
  }
  // jsonp请求方式
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, (err, res) => {
        if (res.status === 'success') {
          resolve(res)
        } else {
          reject(res.message)
        }
      })
    })
  }
  // 全局api请求封装
  static ajax(options) {
    let baseUrl = ''
    if (options.isMock) {
      baseUrl = 'https://www.easy-mock.com/mock/5c6d5a502c14ce6f70caba98/manageApi'
    } else {
      baseUrl = 'https://www.easy-mock.com/mock/5c6d5a502c14ce6f70caba98/manageApi'
    }
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: options.method || 'GET',
        baseURL: baseUrl,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then(response => {
        let res = response.data
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if (response.status === 200) {
          if (res.code === 0) {
            resolve(res)
          } else {
            message.error(res.message);
          }
        } else {
          reject(res)
        }
      })
    })
  }
}