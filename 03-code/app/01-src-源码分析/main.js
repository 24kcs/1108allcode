// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入vue
import Vue from 'vue'
// 引入App组件---所有组件的父级组件
import App from './App'
// 管理浏览器的控制台中的提示信息
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app', // 根据id选择器获取index.html文件中的div容器
  components: { App }, // 注册组件
  template: '<App/>' // 使用App组件模版
})
/**
 * 组件:具有特定功能效果的集合,html+css+js  形成的文件  Vue中就是.vue文件  就是组件文件,每个文件都有自己的名字
 * App.vue  该文件就是App组件文件,该组件的名字就叫:App
 * 组件的使用:
 * 首先定义组件,然后引入组件,注册组件,使用组件
 */
