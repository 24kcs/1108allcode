// 引入Home路由组件
import Home from '@/pages/Home'
// 引入注册路由组件
import Register from '@/pages/Register'
// 引入登录路由组件
import Login from '@/pages/Login'
// 引入搜索路由组件
import Search from '@/pages/Search'

	

export default [
  // Home路由组件
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
    name:'search',
    path: '/search/:keyword?', //params参数可传可不传
    component: Search
  },
  // 路由重定向设置
  // {
  //   path: '/',
  //   redirect: '/'
  // }
]