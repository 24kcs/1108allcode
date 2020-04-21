/**
 * 对axios进行二次包装
 * 1. 配置通用的基础路径和超时
 * 2. 显示请求进度条
 * 3. 成功返回的数据不再是response,而直接是响应体数据response.data
 * 4. 统一处理请求错误,具体请求也可以选择处理或不处理
 * 
 * 
 * 
 */
// 引入axios
import axios from 'axios'
// 引入nprogress插件包及样式文件
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置进度条在顶部显示还是在右侧显示
// 不显示右上角的旋转进度条,值显示水平进度条
Nprogress.configure({ showSpinner: false })


// 创建一个新的axios的实例
// 1. 配置通用的基础路径和超时
const ajax = axios.create({
  baseURL: '/api', // 前缀路径
  timeOut: 20000 // 连接请求超时时间
})
// 添加请求拦截器
ajax.interceptors.request.use(config => {
  // 2. 显示请求进度条
  Nprogress.start() // 显示进度条(响应成功或者失败的时候需要隐藏)

  return config
})
// 添加响应拦截器
ajax.interceptors.response.use(response => {
  Nprogress.done() // 隐藏进度条
  // 3. 成功返回的数据不再是response,而是response.data
  return response.data
}, error => {
  Nprogress.done() // 隐藏进度条

  // 4. 统一处理请求错误,具体请求可以选择处理或不处理
  alert('请求出错:' + error.message || '未知错误')

  // return new Promise(()=>{}) // 中断Promise链,具体请求不能再处理了
  return Promise.reject(error) // 返回失败的Promise ,具体的请求可以再处理
})
// 向外暴露ajax
export default ajax

