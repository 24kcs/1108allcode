(function (window) {
  // 定义消息订阅对象
  const PubSub = {}
  // 定义容器对象,用来存储消息名字及对应的对象(对象中以键值对的方式存储token及回调函数)
  let subscribersContainer = {} // 大容器
  let id = 0
  // 订阅消息
  PubSub.subscribe = function (msg, subscriber) {
    // 根据订阅消息的名字获取对应的所有回调函数容器
    let subscribers = subscribersContainer[msg]
    // 判断小容器是否存在
    if (!subscribers) {
      subscribers = {}
      // 消息名字和小容器以键值对的方式存储到大的容器中
      subscribersContainer[msg] = subscribers
    }
    // 创建token
    const token = 'id_' + ++id
    subscribers[token] = subscriber
    return token
  }
  // 发布消息 
  PubSub.publishSync = function (msg, data) {
    let subscribers = subscribersContainer[msg]
    // 判断小容器对象是否存在
    if (subscribers) {
      Object.values(subscribers).forEach(subscriber => {
        subscriber(data)
      })
    }
  }

  // 异步发布消息
  PubSub.publish = function (msg, data) {
    let subscribers = subscribersContainer[msg]
    setTimeout(() => {
      if (subscribers) {
        Object.values(subscribers).forEach(subscriber => {
          subscriber(data)
        })
      }
    }, 1000);
  }

  // 取消订阅
  PubSub.unsubscribe = function (token) {
    if (typeof token === 'undefined') {
      // 什么也没传
      subscribersContainer = {}
    } else if (token.indexOf('id_') !== -1) {
      // 根据token标识
      const subscribers = Object.values(subscribersContainer).find(subscribers => subscribers[token])
      subscribers && delete subscribers[toekn]
    } else {
      // 根据消息名字取消消息订阅
      delete subscribersContainer[token]
    }
  }

  window.PubSub = PubSub
})(window)