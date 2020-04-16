<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchTxt" />
      <button @click="clickHandle">Search</button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      searchTxt: '' // 用来存储文本框中输入的数据
    }
  },
  methods: {
    // 点击按钮,分发绑定的search事件,同时传入搜索的内容
    clickHandle() {
      // 获取文本框的数据
      const txt = this.searchTxt.trim() // 干掉两端的空格
      if (txt) {
        // 分发事件
        // this.$bus.$emit('search', txt)
        this.$store.dispatch('search',txt)
        // 清空文本框
        this.searchTxt = ''
      }
    }
  }
}
</script>
<style scoped>
</style>
