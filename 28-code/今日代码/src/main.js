// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 设置控制台不显示提示信息
Vue.config.productTip = false
// 设置程序类型
App.mpType = 'app'
// 实例化
const app = new Vue(App)
// 挂载
app.$mount()
