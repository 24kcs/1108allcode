// 引入组件
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
// 引入News和Message
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
// 引入MessageDetil组件
import MessageDetail from '../pages/MeesageDetail.vue'
export default [
  // 地址和组件的关系的建立
  // 普通组件如果和链接之间建立了关系后就形成了路由组件,每个路由组件仍然是对象
  {
    path: '/about',
    component: About
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/news',
        component: News
      },
      {
        path: '/home/message',
        component: Message,
        children:[
          {
            path:'/home/message/detail/:id',  // 路由如何传参?
            component:MessageDetail,
            // 函数模式
            props: (route) => ({ id: route.params.id })
          }
        ]

      },
      {
        path:'/home',  // 此位置可以使用空的字符串
        redirect: '/home/news'
      }
    ]
  },
  {
    path: '/',
    redirect: '/about'
  }
]