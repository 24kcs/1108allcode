<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--使用组件-->
    <HelloWorld/>
    <!-- <hello-world/> -->
  </div>
</template>

<script>
// 引入HelloWorld子级组件
import HelloWorld from './components/HelloWorld'
// App和HelloWorld组件是父子关系

export default {
  // 当前组件的名字(该行代码可以不写,推荐大家写上)
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
