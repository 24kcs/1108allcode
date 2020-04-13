<template>
  <div>
    这是App组件
    <HelloWorld/>
  </div>
</template>
<script>
// 引入HelloWorld组件
import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
<style>
div{
  width:200px;
  height:100px;
  color:red;
}
</style>
