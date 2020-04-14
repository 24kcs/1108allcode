<template>
  <div class="container">
    <Search />
    <Main />
  </div>
</template>
<script>
// 引入Search
import Search from './components/Search'
// 引入Main
import Main from './components/Main'
export default {
  name: 'App',
  components: {
    Main,
    Search
  }
}
</script>
<style scoped>
</style>
