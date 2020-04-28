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
    component: Register,
    meta: {
      isHideFooter: true // 是否隐藏Footer组件
    }
  },
  // 登录路由组件
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true // 是否隐藏Footer组件
    }
  },
  // 搜索路由组件
  {
    // 路由传参
    name: 'search', // 命名路由
    path: '/search/:keyword?', // params参数可传可不传
    component: Search
  },
  // 重定向
  {
    path: '/',
    redirect: '/'
  }
]