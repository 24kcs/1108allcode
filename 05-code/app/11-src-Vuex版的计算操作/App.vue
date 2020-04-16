<template>
  <div>
    <h2>Vuex版本的:点击次数:{{$store.state.count}},奇数or偶数:{{$store.getters.evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="incrementOrOdd">incrementOrOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  // computed: {
  //   evenOrOdd() {
  //     return this.count % 2 === 0 ? '偶数' : '奇数'
  //   }
  // },
  methods: {
    // 加的操作
    increment() {
      this.$store.commit('increment')
    },
    // 减的操作
    decrement() {
      this.$store.commit('decrement')
    },
    // 奇数加的操作
    incrementOrOdd() {
      // 提交对应的action
      this.$store.dispatch('incrementOrOdd')
    },
    // 异步加的操作
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    }
  }
}
</script>
<style scoped>
</style>
