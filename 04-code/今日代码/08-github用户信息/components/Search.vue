<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchTxt" />
      <button @click="searchHandle">Search</button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      searchTxt: ''
    }
  },
  methods: {
    searchHandle () {
      // 获取文本框数据
      const txt = this.searchTxt.trim()
      if (txt) {
        this.$bus.$emit('search', txt)
        // 清空文本框
        this.searchTxt = ''
      }
    }
  }
}
</script>
<style scoped>
</style>
