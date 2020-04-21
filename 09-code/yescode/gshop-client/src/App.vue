<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter" />
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入Footer组件
import Footer from './components/Footer'
// 引入接口,测试
// import {reqBaseCategoryList} from './api'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    Footer
  },
  // 页面加载后,测试接口
  mounted() {
    // const result = await reqBaseCategoryList()
    // console.log('结果:',result)
  }
}
</script>
<style lang="less" rel="stylesheet/less" >
</style>
