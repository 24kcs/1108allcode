// 封装axios,设置请求拦截器和响应拦截器
// 引入axios
import axios from 'axios'

// 配置一个通用的基础路径和请求超时时间
const ajax = axios.create({
  baseUrl: '/api', // 前缀路径
  timeOut: 20000 // 连接请求超时时间
})

// 请求拦截器
ajax.interceptors.request.use(config => {

})

// 响应拦截器
ajax.interceptors.response.use(response => { }, error => { })


// 向外暴露ajax
export default ajax