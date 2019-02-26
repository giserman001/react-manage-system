import JsonP from 'jsonp'
import axios from 'axios'
import { message } from 'antd'
let baseUrl = ' https://www.easy-mock.com/mock/5c6d5a502c14ce6f70caba98/manageApi'

export default class Axios {
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
  static ajax(options) {
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