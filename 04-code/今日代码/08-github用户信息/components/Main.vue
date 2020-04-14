<template>
  <h2 v-if="firstView">请输入搜索内容...</h2>
  <h2 v-else-if="loading">正在发送请求中...</h2>
  <h2 v-else-if="errorMsg">错误信息为:{{errorMsg}}</h2>
  <div class="row" v-else>
    <div class="card" v-for="(user, index) in users" :key="index">
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
  data () {
    return {
      firstView: true, // 默认第一个提示信息,显示的
      loading: false, // 第二个提示信息默认不显示
      errorMsg: '', // 错误信息提示
      users: [] // 用户信息对象
    }
  },
  mounted () {
    this.$bus.$on('search', async searchName => {
      const url = `https://api.github.com/search/users`
      // 第一次更改状态数据
      this.firstView = false
      this.loading = true
      try {
        const response = await axios.get(url, {
          params: {
            q: searchName
          }
        })
        // 遍历数据并存储到users对象中
        const users = response.data.items.map(user => ({
          login: user.login,
          html_url: user.html_url,
          avatar_url: user.avatar_url
        }))
        // 第二次更新状态数据
        this.loading = false
        this.users = users
      } catch (error) {
        // 第三次更新数据
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
