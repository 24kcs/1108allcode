<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--使用子级组件-->
    <HelloWorld/>
  </div>
</template>

<script>
// 引入组件
import HelloWorld from './components/HelloWorld'

export default {
  // 设置当前组件名字
  name: 'App',
  // 注册组件
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
