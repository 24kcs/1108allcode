/*
包含项目中n个组件可复用的js配置
*/

export const cpMixin = {
  methods: {
    /*
    取钱的方法, 由父组件调用
    */
    pullMoney(count) {
      this.money -= count
    },

    /*
    借钱给老爸
    */
    gaveMoney(count) {
      this.money -= count
      // 通过$parent得到父组件对象
      this.$parent.money += count
    }
  }
}
