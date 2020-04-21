// 引入组件,并注册成路由组件 -------------
// @相当于src,目前使用@符号是没有任何提示的,配置jsconfig.json的文件,设置@引入的智能提示

// 引入首页组件
import Home from '@/pages/Home'
// 引入注册组件
import Register from '@/pages/Register'
// 引入登录组件
import Login from '@/pages/Login'
// 引入Search组件
import Search from '@/pages/Search'
export default [
  // 首页路由组件
  {
    path: '/',
    component: Home
  },
  // 注册路由组件
  {
    path: '/register',
    component: Register
  },
  // 登录路由组件
  {
    path: '/login',
    component: Login
  },
  // 搜索路由组件
  {
    path: '/search',
    component: Search
  },
  // 重定向
  {
    path: '/',
    redirect: '/'
  }
]