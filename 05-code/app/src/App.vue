<template>
  <div>
    <h2>Vue版本的:点击次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="incrementOrOdd">incrementOrOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>
<script>
export default {
  name: 'App',
  // 数据对象
  data() {
    return {
      // 数据-----数据的值会发生变化,其实就是数据的状态在发生变化
      // 状态数据
      count: 0
    }
  },
  computed: {
    evenOrOdd() {
      return this.count % 2 === 0 ? '偶数' : '奇数'
    }
  },
  methods: {
    // 加的操作
    increment() {
      this.count++
    },
    // 减的操作
    decrement() {
      this.count--
    },
    // 奇数加的操作
    incrementOrOdd() {
      if (this.count % 2 !== 0) {
        this.count++
      }
    },
    // 异步加的操作
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    }
  }
}
</script>
<style scoped>
</style>
