<template>
  <h2 v-if="firstView">请输入搜索关键字</h2>
  <h2 v-else-if="loading">正在加载中...</h2>
  <h2 v-else-if="errorMsg">错误信息为:{{errorMsg}}</h2>
  <div v-else class="row">
    <div class="card" v-for="(user,index) in users" :key="index">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
  </div>
</template>
<script>
// 引入axios
import axios from 'axios'
export default {
  name: 'Main',
  data() {
    return {
      firstView: true, // 默认是true,表示的是显示提示信息
      loading: false, // 默认是false,不显示提示信息
      errorMsg: '', // 默认为空,没有任何提示的错误信息
      users: [] // 用来存储用户对象信息的
    }
  },
  // 页面加载后
  mounted() {
    // 通过事件总线绑定事件
    this.$bus.$on('search', async searchName => {
      const url = `https://api.github.com/search/users`
      // 第一次更改状态数据
      this.firstView = false
      this.loading = true
      try {
        // 发送异步请求
        // console.log('===' + searchName)
        const response = await axios.get(url, {
          params: {
            q: searchName
          }
        })
        // 获取响应的数据,并保存用户的信息到uesrs数组中
        // console.log(response)
        const users = response.data.items.map(user => ({
          login: user.login,
          html_url: user.html_url,
          avatar_url: user.avatar_url
        }))
        // 第二次更新状态数据
        this.loading = false
        this.users = users
      } catch (error) {
        // 第三次更改状态数据
        this.loading = false
        this.errorMsg = error
      }
    })
  }
}
</script>
<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
