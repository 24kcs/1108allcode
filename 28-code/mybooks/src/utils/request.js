// 引入config
import config from './config.js'
// 该方法的作用就是发送请求
function request (url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      success: function (res) {
        resolve(res.data) // 成功的数据
      },
      fail: function (error) {
        // fail
        reject(error.message)
      }
    })
  })
}
export default request
