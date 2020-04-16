<template>
  <div>
    <div class="container">
      <Search />
      <Main />
    </div>
  </div>
</template>
<script>
// 引入Search组件
import Search from './components/Search'
// 引入Main组件
import Main from './components/Main'
export default {
  name: 'App',
  // 注册组件
  components: {
    Search,
    Main
  }
}
</script>
<style scoped>
</style>
