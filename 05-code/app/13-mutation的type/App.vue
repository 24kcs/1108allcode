<template>
  <div>
    <h2>Vuex版本的:点击次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="incrementOrOdd">incrementOrOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>
<script>
// 引入Vuex中的辅助函数
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// 引入mutation-type
import {INCREMENT,DECREMENT} from './vuex/mutation-type'
export default {
  name: 'App',
  data() {
    return {}
  },
  // 通过Vuex的辅助函数,可以直接获取Vuex中的状态数据,mutation,action,getter
  computed: {
    // count() {
    //   return this.$store.state.count
    // },
    // evenOrOdd() {
    //   return this.$store.getters.evenOrOdd
    // }
    // 拆包: 'count':(){return.$store.state.count}
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])
  },
  methods: {
    ...mapMutations({ increment: INCREMENT, decrement: DECREMENT }),
    ...mapActions(['incrementOrOdd', 'incrementAsync'])

    // 加的操作
    // increment() {
    //   this.$store.commit('INCREMENT')
    // },
    // // 减的操作
    // decrement() {
    //   this.$store.commit('DECREMENT')
    // },
    // 奇数加的操作
    // incrementOrOdd() {
    //   // 提交对应的action
    //   this.$store.dispatch('incrementOrOdd')
    // },
    // // 异步加的操作
    // incrementAsync() {
    //   this.$store.dispatch('incrementAsync')
    // }
  }
}
</script>
<style scoped>
</style>
