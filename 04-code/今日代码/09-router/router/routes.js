// 引入About
import About from '../pages/About.vue'
// 引入Home
import Home from '../pages/Home.vue'
// 引入News
import News from '../pages/News.vue'
// 引入Message
import Message from '../pages/Message.vue'
// 引入MessageDetail
import MessageDetail from '../pages/MessageDetail.vue'
export default [
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
        children: [
          {
            path: '/home/message/detail/:id',
            component: MessageDetail,
            props: (route) => ({ id: route.params.id })
          }
        ]
      },
      {
        path: '/home',
        redirect: '/home/news'
      }
    ]
  },
  {
    path: '/',
    redirect: '/about'
  }
]
