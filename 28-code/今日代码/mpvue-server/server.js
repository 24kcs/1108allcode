// 服务端的代码
// 使用koa koa-router flyio nodemon
// 引入koa
let Koa = require('koa')
// 引入koa-router
let KoaRouter = require('koa-router')
// 引入datas数据
let datas = require('./datas/data.json')
// 实例化Koa
let koa = new Koa()
// 实例化KoaRouter
let koaRouter = new KoaRouter()
// 调用方法
koaRouter.get('/', (ctx, next) => {
  const req = ctx.query.req
  console.log(req)
  ctx.body = '哈哈,您好'
})

// 登录接口测试
koaRouter.get('/login', (ctx) => {
  const result = ctx.query.pwd
  console.log(result)
  ctx.body = { name: '小明', age: 18 }
})

// 搜索接口
koaRouter.get('/search', (ctx) => {
  // 获取调用接口的时候传入的参数
  const req = ctx.query.req
  console.log(req)
  // 响应回去的数据
  ctx.body = datas
})

// 通过koa使用路由的相关方法及相关路由
koa
  .use(koaRouter.allowedMethods())
  .use(koaRouter.routes())
// 监视对应的端口
koa.listen('4000', () => {
  console.log('服务器启动了')
  console.log('服务器的地址:http:///localhost:4000')
})
