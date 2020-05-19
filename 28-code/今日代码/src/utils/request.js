// 引入config
import config from './config.js'
function request (url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      success: function (res) {
        resolve(res.data)
      },
      fail: function (error) {
        reject(error.message)
      }
    })
  })
}
export default request
