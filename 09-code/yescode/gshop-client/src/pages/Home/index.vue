<template>
  <div class="home">
    <!-- 商品分类导航 -->
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor />
    <!--楼层-->
    <Floor />
    <!--商标-->
    <Brand />
  </div>
</template>
<script>
// 引入 列表 ListContainer 组件
import ListContainer from './ListContainer'
// 引入 今日推荐 TodayRecommend 组件
import TodayRecommend from './TodayRecommend'
// 引入 商品排行 Rank 组件
import Rank from './Rank'
// 引入 猜你喜欢 Like 组件
import Like from './Like'
// 引入 楼层 Floor 组件
import Floor from './Floor'
// 引入 商标 Brand 组件
import Brand from './Brand'
export default {
  name: 'Home',
  // 注册组件
  components: {
    TodayRecommend,
    ListContainer,
    Rank,
    Like,
    Floor,
    Brand
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.home {
}
</style>