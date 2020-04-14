<template>
  <div>
    <h2>周三白天正常自习,华哥</h2>
    <Hello/>
  </div>
</template>
<script>
// 引入Hello子级组件
import Hello from './components/Hello'
// 向外暴露当前的这个组件对象,组件也是对象
export default {
  name: 'App',
  // 注册组件
  components: {
    Hello
  }
}
</script>
<style scoped>
div{
  color:pink;
}
</style>
