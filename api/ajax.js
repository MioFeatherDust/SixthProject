// ajax请求模块
import axios from '../js_sdk/axios-miniprogram/axios/lib/index.js'
export default function ajax (url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    //  执行异步ajax请求
    let promise
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功调用res（）
      resolve(response.data)
	  // console.log(response.data)
    })
      .catch(function (error) {
        // 失败调用rej（）
        reject(error)
      })
  })
}
