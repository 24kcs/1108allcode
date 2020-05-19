// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 设置控制台中不显示默认的提示信息
Vue.config.productTip = false
// 设置当前程序的类型是小程序
App.mpType = 'app'
// 实例化Vue
const app = new Vue(App)
// 挂载
app.$mount()
