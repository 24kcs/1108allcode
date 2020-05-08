<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoney1">找儿子小明借100元钱</button>
    <br />
    <hr />
    <button @click="borrowMoney2">找女儿小红借200元钱</button>
    <br />
    <hr />
    <button @click="borrowMoney3">找所有孩子借500元钱</button>
    <br />
    <hr />
    <Son ref="son" />
    <Daughter ref="dau" />
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data() {
    return {
      money: 1000
    }
  },

  methods: {
    // 找小明
    borrowMoney1() {
      // 直接操作子级组件的数据
      // this.$refs.son.money -= 100
      // 通过方法实现
      console.log(this.$refs.son)
      this.$refs.son.pullMoney(100)
      this.money += 100
    },
    borrowMoney2() {
      // 直接操作子级组件的数据
      // this.$refs.son.money -= 100
      // 通过方法实现
      this.$refs.dau.pullMoney(200)
      this.money += 200
    },
    borrowMoney3() {
      // this.$refs.son.pullMoney(500)
      // this.$refs.dau.pullMoney(500)
      // this.money += 1000
      this.$children.forEach(child => {
        child.pullMoney(500)
        this.money += 500
      })
    }
  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>
</style>
