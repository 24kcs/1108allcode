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
    borrowMoney1() {
      // 直接操作子级组件的数据----,这种方式是不太推荐
      // this.$refs.son.money -= 100
      // $refs是个对象,可以获取对应的某个标签(组件)对象,可以调用子级组件的方法
      this.$refs.son.pullMoney(100)
      this.money += 100
    },
    borrowMoney2() {
      // 直接操作子级组件的数据----,这种方式是不太推荐
      // this.$refs.dau.money -= 100
      // $refs是个对象,可以获取对应的某个标签(组件)对象,可以调用子级组件的方法
      this.$refs.dau.pullMoney(200)
      this.money += 200
    },
    // 找所有的孩子借钱的功能
    // 如果子女很多,下面的代码就不合适
    borrowMoney3() {
      // this.$refs.son.money -= 500
      // this.$refs.dau.money -= 500
      // 获取当前父级组件中的所有的子级组件,进行遍历操作
      this.$children.forEach(child => {
        child.pullMoney(500)
        this.money += 1000
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
