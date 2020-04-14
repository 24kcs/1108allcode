<template>
  <div>
    <ul>
      <li v-for="(m,index) in messages" :key="index">
        <router-link replace :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>
        ----
        <button @click="pushDetail(m.id)">push查看</button>---
        <button @click="replaceDetail(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>
    <hr>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Message',
  data () {
    return {
      messages: [] // 空数组
    }
  },
  mounted () {
    setTimeout(() => {
      this.messages = [
        { id: 1, title: 'message001' },
        { id: 2, title: 'message002' },
        { id: 3, title: 'message003' }
      ]
    }, 1000)
  },
  methods: {
    pushDetail (id) {
      this.$router.push(`/home/message/detail/${id}`)
    },
    // replace方式---相当于没有记录
    replaceDetail (id) {
      this.$router.replace(`/home/message/detail/${id}`)
    }
  }
}
</script>
<style scoped>
</style>
