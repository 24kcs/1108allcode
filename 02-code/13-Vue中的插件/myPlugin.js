// 自定义Vue的插件,Vue的插件有很多的
// 插件:封装一些代码,实现相关的功能,使用之前先暴露出去,声明使用即可
// 插件其实也是一个对象,所以该对象可以在window下使用,一定要先暴露

(function (window) {
  // 先定义一个对象
  const MyPlugin = {}
  // 先暴露一个install的方法,所有的插件的资源都在这里书写
  MyPlugin.install = function (Vue) {
    // 一个功能就是一个方法,一般情况,这个方法是一个全局方法,在制作这个插件的时候,也会定义一个实例的方法和当前的全局方法一一对应
    // 定义一个全局的方法
    Vue.myGlobalMethod = function () {
      console.log('全局的方法')
    }
    // 添加一个全局的指令
    Vue.directive('my-directive', function (el, binding) {
      el.innerHTML = 'my-directive' + '==========' + binding.value
    })
    // 定义一个实例的方法
    Vue.prototype.$myMethod = function () {
      console.log('实例方法')
    }

  }

  // 暴露出去
  window.MyPlugin = MyPlugin
})(window)