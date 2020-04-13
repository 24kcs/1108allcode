// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App'
// 设置浏览器控制台是否显示提示信息
Vue.config.productionTip = false
// eslint注释
/* eslint-disable no-new */
// 实例化Vue
new Vue({
  // 选择器
  el: '#app',
  // 注册组件
  components: { App },
  // 使用App模版
  template: '<App/>'
})
