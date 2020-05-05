<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter" />
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入Footer组件
import Footer from './components/Footer'
// 引入api接口
// import {reqBaseCategoryList} from './api'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    Footer
  },
  // 页面加载后的生命周期回调
  mounted () {
    // 通过dispatch提交对应的action,获取分类信息数据(没有必要发多次请求)
    this.$store.dispatch('getBaseCategoryList')
    // const result = await reqBaseCategoryList()
    // console.log(result)
    // 通过提交actions,使用vuex的方式来发送请求
    // this.$store.dispatch('getBaseCategoryList') // 异步操作
    // console.log(this.$store)
    // console.log(this.$store.state.home.baseCategoryList)
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>