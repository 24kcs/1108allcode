<template>
  <a href="javascript:;" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners">添加</el-button> 
  </a>
</template>

<script>
export default {
  name: 'LinkButton',
  props: ['title'], // 确定的属性通过props声明接收, 不确定的属性通过$attrs接收
  mounted() {
    console.log('---', this.$attrs, this.$listeners)
  }
}
</script>

<style lang="less" scoped>
</style>
