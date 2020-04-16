<template>
  <div>
    <ul>
      <li v-for="(m,index) in messages" :key="index">
        <router-link replace :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>---
        <button @click="pushHandle(m.id)">push查看</button>
        ---
        <button @click="replaceHandle(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>  <!-- back回调中: this.$router.back() -->
     
    <router-view></router-view>
  </div>
</template>
<script>
/**
 *
 * router-link 配合router-view 这种方式可以直接实现路由的跳转,及传参,和显示对应的路由组件内容----并不是通过js代码的方式来实现的
 * 向上面的这种方式实现路由的跳转---可以称为:声明式路由
 * 路由的方式:声明式路由和编程式路由
 * 声明式路由:直接使用router-link配合router-view的方式来实现路由跳转
 * 编程式路由:通过js代码的方式来实现路由的跳转
 * push()和router-link 在使用的时候是有上一次的历史记录的,所以,使用back()方法会回到上一次的记录中
 * replace()在使用的时候直接回到最初的状态,没有历史记录,所以,back()方法会回到最开始的记录中
 *
 */

export default {
  name: 'Message',
  data() {
    return {
      messages: [] // 空数组
    }
  },
  // 页面加载后的回调函数---生命周期函数
  mounted() {
    setTimeout(() => {
      this.messages = [
        { id: 1, title: 'message001' },
        { id: 3, title: 'message003' },
        { id: 5, title: 'message005' }
      ]
    }, 1000)
    // 当前的组件是路由组件---路由组件依然是组件,既然是组件就直接或间接的继承自Vue的实例了,所以,当前的路由组件内部必然会有一个路由器对象---$router
    // console.log(this)
  },
  methods: {
    // push的方式跳转
    pushHandle(id) {
      this.$router.push(`/home/message/detail/${id}`)
    },
    // replace的方式跳转
    replaceHandle(id) {
      this.$router.replace(`/home/message/detail/${id}`)
    }
  }
}
</script>
<style scoped>
</style>
