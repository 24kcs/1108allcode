<template>
  <div>
    <h2 v-if="!repUrl">正在加载中...</h2>
    <h2 v-else>
      Most Star is
      <a :href="repUrl">{{repName}}</a>
    </h2>
  </div>
</template>
<script>
// 在Vue中如何发送异步请求
// 通过vue-resource 这个封装后的插件调用$http对象.get()方法来发送异步请求
// 还可以通过axios发送异步请求
// 推荐使用axios 的方式发送异步请求



// 需求: 页面加载后显示的是: 正在加载中... ,过了一会 显示的内容为:Most Star is Vue
// 从github上获取  某个技术的名字及该技术的链接地址

// 引入axios
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      repUrl: '', // 默认是空字符串,发送请求获取数据后里面存储的就是链接地址
      repName: '' // 默认是空字符串,发送请求获取数据后里面存储的就是技术的名字
    }
  },
  // 页面加载后的生命周期
  mounted() {
    // 发送异步请求
    // GET /someUrl
    const url = `https://api.github.com/search/repositories?q=v&sort=stars`

    axios
      .get(url)
      .then(response => {
        const result = response.data.items[0]
        // 更新状态数据
        this.repUrl = result.html_url
        this.repName = result.name
      })
      .catch(error => {
        console.log(error)
      })

    // this.$http
    //   .get(url)
    //   .then(response => {
    //     const result = response.data.items[0]
    //     // 更新状态数据
    //     this.repUrl = result.html_url
    //     this.repName = result.name
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }
}
</script>
<style scoped>
</style>
