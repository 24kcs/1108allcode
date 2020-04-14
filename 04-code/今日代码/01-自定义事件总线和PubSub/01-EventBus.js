(function (window) {
  // 定义事件总线对象
  const EventBus = {}
  // 定义容器对象--用来存储事件名字及对应事件的回调函数
  let listenersContainer = {}
  // 绑定事件
  EventBus.on = function (eventName, listener) {
    // 根据事件名字通过容器对象查找该事件对应的回调函数数组
    let listeners = listenersContainer[eventName]
    // 判断该数组是否存在
    if (!listeners) {
      // 容器数组不存在则表示第一次绑定事件,搜易定义数组
      listeners = []
      // 把事件名字作为键,把数组作为值,以键值的方式存储到容器对象中
      listenersContainer[eventName] = listeners
    }
    // 把回调函数添加到对应的数组中
    listeners.push(listener)
  }
  // 分发事件
  EventBus.emit = function (eventName, data) {
    let listeners = listenersContainer[eventName]
    if (listeners && listeners.length > 0) {
      listeners.forEach(listener => {
        listener(data)
      })
    }
  }
  // 解绑事件
  EventBus.off = function (eventName) {
    // 判断是否传入了事件名字
    if (typeof eventName === 'undefined') {
      listenersContainer = {}
    } else {
      delete listenersContainer[eventName]
      // 或者
      listenersContainer[eventName] = []
    }
  }

  window.EventBus = EventBus
})(window)