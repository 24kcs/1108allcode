// 服务端的代码
// 使用koa 和koa-router的方式来快速的搭建服务器  flyio nodemon
// 引入koa
let Koa = require('koa')
// 引入koa-router
let KoaRouter = require('koa-router')
// 引入datas数据
let datas = require('./datas/data.json')
// 实例化koa----监听端口,启动
let koa = new Koa()
// 实例化KoaRouter----设置地址的
let koaRouter = new KoaRouter()
// 引入Fly
var Fly = require('flyio/src/node')
// 特殊
var fly = new Fly
// 设置地址
koaRouter.get('/', (ctx, next) => {
  // ctx对象可以获取前台调用接口的时候传入的参数数据
  const req = ctx.query.req
  console.log(req)
  // 响应给前台数据
  ctx.body = '哈哈,您好啊'

  // next --->放行next
})
// 前台将来调用的接口是  getshop?req=857
koaRouter.get('/getshop', (ctx, next) => {
  // ctx对象可以获取前台调用接口的时候传入的参数数据
  const req = ctx.query.money
  console.log(req)
  // 响应给前台数据
  const shops = [
    {
      name: '胡萝卜',
      price: '23元'
    },
    {
      name: '黄瓜',
      price: '24元'
    },
    {
      name: '茄子',
      price: '25元'
    },
    {
      name: '苦瓜',
      price: '26元'
    },
    {
      name: '榴莲',
      price: '27元'
    },
  ]
  ctx.body = shops
  // next --->放行next
})

koaRouter.get('/login', (ctx, next) => {
  // ctx对象可以获取前台调用接口的时候传入的参数数据
  const req = ctx.query.name
  console.log(req)
  // 响应给前台数据

  ctx.body = {
    token: '12345',
    userPwd: '90'
  }
  // next --->放行next
})
// 搜索的接口
koaRouter.get('/search', (ctx) => {
  // 获取调用search这个接口的时候传递过来的搜索内容参数数据
  const req = ctx.query.req
  console.log(req)
  ctx.body = datas
})
// 获取opendId的接口
koaRouter.get('/getopenid', async (ctx) => {
  // 调用该接口,传入进来的参数数据
  const code = ctx.query.req
  // appId
  const appid = 'wx8dc92766a09575de'
  // 密钥
  const secret = '8cc9978fb559e68c8b37ae4b71ee2788'
  // 请求接口的地址
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
  // 此时在开发者的服务器上(后台),还要发送请求,而且还要获取成功后的数据
  let result = await fly.get(url)

  result = JSON.parse(result.data)
  ctx.body = result.openid + '---------' + result.session_key
})

// 通过koa使用路由的相关的方法及路由
koa
  .use(koaRouter.allowedMethods())
  .use(koaRouter.routes())
koa.listen('4000', () => {
  console.log('服务器启动了')
  console.log('服务器的地址:http://localhost:4000')
})
