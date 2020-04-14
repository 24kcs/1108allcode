/**
 * 
 * 自定义事件总线和自定义PubSub----理解--面试
 * html文件内部引入EventBus.js文件----封装了事件总线的对象及方法
 * 
 * 事件总线---对象---EventBus
 * EventBus.on(eventName,listener)----绑定事件
 * EventBus.emit(eventName,data)----分发事件
 * EventBus.off(eventName)-----解绑事件
 * eventName-----事件类型(事件名字)
 * listener----事件监听(回调函数)
 * data-----事件对应的回调函数中的参数数据
 * 
 * 使用事件总线绑定事件---绑定了add事件,该事件对应着3个回调函数
 * EventBus.on('add',f1)
 * EventBus.on('add',f2)
 * EventBus.on('add',f3)
 * 使用事件总线分发事件---分发add事件,该事件触发的时候,f1,f2,f3三个回调函数都会被调用执行,传入'123'
 * EventBus.emit('add','123')
 * 绑定的事件中:一个事件可以对应多个回调函数
 *  在绑定事件的时候,应该把同名的事件及对应的回调函数通过一个大的容器存储起来
 * 容器对象存储事件及对应的回调函数
 * {add:[f1,f2,f3],del:[f4,f5,f6]}---事件:[回调1,回调2,回调3]
 * 
 * 
 * 
 */
(function (window) {
  // 定义事件总线对象
  const EventBus = {}
  // 定义容器对象,用来存储事件名字及对应的事件回调函数--{'add':[f1,f2,f3],'del':[f4,f5]}
  let listenersContainer = {}
  // 绑定事件
  EventBus.on = function (eventName, listener) {
    // 根据事件名字通过容器对象查找该事件对应的数据数组
    let listeners = listenersContainer[eventName]
    // 判断该数组是否存在
    if (!listeners) {
      // 如果该数组不存在,第一次调用on方法绑定事件,传入回调
      listeners = []
      // 把事件名字作为键,数组作为值,把这对键值存储到大的容器对象中
      listenersContainer[eventName] = listeners
    }
    // 把回调函数添加到对应的数组中(无论是不是第一次绑定事件,都会这么做)
    listeners.push(listener)
  }
  // 分发事件
  EventBus.emit = function (eventName, data) {
    // 根据事件名字在大的容器对象中找对应的回调函数数组
    let listeners = listenersContainer[eventName]
    // 判断存储回调函数的数组是否存在
    if (listeners && listeners.length > 0) {
      // 遍历数组中回调函数,传入参数,并调用
      listeners.forEach(listener => {
        listener(data)
      })
    }
  }
  // 解绑事件
  EventBus.off = function (eventName) {
    // 解绑事件可以传入事件名字进行解绑,也可以什么都不传入解绑事件

    // 什么也不传入,那就是干掉所有的事件
    if (typeof eventName === 'undefined') {
      listenersContainer = {}
    } else {
      // 传入事件名字,那就是干掉该事件对应的所有的回调函数
      //大容器中: {'add':[f1,f2,f3],'del':[f4,f5]}
      delete listenersContainer[eventName]
      // 或者
      // listenersContainer[eventName] = []
    }
  }
  // 暴露事件总线对象
  window.EventBus = EventBus
})(window)
