/**
 * 自定义PubSub消息订阅
 * 消息订阅的对象---PubSub
 * PubSub.subscribe(msg,subscriber)----订阅消息
 * PubSub.publish(msg,data)----异步发布消息
 * PubSub.publisSync(msg,data)---同步发布消息
 * PubSub.unsubscribe(token)---取消消息订阅
 * msg----消息名字----可以理解为事件名字
 * subscriber---回调函数---可以理解为事件的回调
 * data----回调函数中的参数数据
 * token---标识---用来取消消息订阅的
 * 在事件总线中同一个事件绑定多个回调函数---大容器对象:{'add':[f1,f2,f3]}
 * 在PubSub中 同一个消息绑定多个回调函数---大容器对象:
 * 消息名字可以对应多个回调函数,但是每个消息对应的回调函数其实都有一个标识,标识用来删除当前这个消息的
 * {add:{id_1:f1,id_2:f2},'del':{id_3:f3}}
 * 
 * 
 */
(function (window) {
  // 定义消息订阅对象---PubSub
  const PubSub = {}
  // 定义容器对象,用来存储消息名字及对应的对象(对象中以键值对的方式来存储token及回调函数)
  let subscribersContainer = {}
  // 定义一个id标识
  let id = 0
  // 消息订阅
  PubSub.subscribe = function (msg, subscriber) {
    // 根据消息名字获取对应的回调函数容器对象
    let subscribers = subscribersContainer[msg]
    // {add:{id_1:f1,id_2:f2},'del':{id_3:f3}}
    // 判断当前回调函数容器对象是否存在
    if (!subscribers) {
      // 定义容器对象{id_1:f1,id_2:f2}
      subscribers = {}
      // 消息名字对应回调函数容器对象一起存储到大的容器对象中
      subscribersContainer[msg] = subscribers
    }
    // 创建token标识
    const token = 'id_' + ++id
    // 根据token和回调函数以键值对的方式存储到  回调函数容器对象中
    subscribers[token] = subscriber
    return token
  }
  // 异步发布消息
  PubSub.publish = function (msg, data) {

  }

  // 同步发布消息
  PubSub.publishSync = function (msg, data) {

  }

  // 取消消息订阅
  PubSub.unsubscribe = function (token) {

  }

  // 暴露出去
  window.PubSub = PubSub
})(window)
