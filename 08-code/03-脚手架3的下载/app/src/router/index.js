// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'

// 引入路由组件
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
// 声明使用路由
Vue.use(VueRouter)
// 实例化路由器并暴露出去
export default new VueRouter({
  mode: 'history', // 设置浏览器地址栏中没有#
  routes: [
    {
      path: '/home',
      component: Home
    },
    // params 方式传参,占位,同时需要通过组件对象中$route对象获取参数数据
    // {
    //   path: '/about/:id',
    //   component: About
    // }

    // query 方式传参
    // {
    //   path: '/about',
    //   component: About
    // }

    // meta方式
    // {
    //   path: '/about',
    //   component: About,
    //   meta: {
    //     isShow: true
    //   }
    // }

    // props传参:1布尔模式
    // {
    //   path: '/about/:id',
    //   component: About,
    //   props:true
    // }
    // props传参:2对象模式
    // {
    //   path: '/about',
    //   component: About,
    //   props:{
    //     msg:'脑瓜疼'
    //   }
    // }
    // props传参:3函数模式
    {
      path: '/about',
      component: About,
      props:route=>({path:route.path})
    }
  ]
})