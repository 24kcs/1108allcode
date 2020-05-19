<template>
  <div class="firstViewContainer">
    <swiper :indicator-dots="current!==3" autoplay @change="changeIndex">
      <swiper-item>
        <img src="/static/imgs/firstView/1.jpg" alt />
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/2.jpg" alt />
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/3.jpg" alt />
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/nvsheng.jpg" alt />
      </swiper-item>
    </swiper>
    <button class="btn" v-show="current===3" @click="goBooks">开启体验</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0 // 默认选中的索引
    }
  },
  methods: {
    changeIndex(event) {
      // 如何获取当前改变的索引
      // console.log(event)
      // 更新当前的索引值
      this.current = event.mp.detail.current
    },
    // 跳转到书籍页面
    goBooks(){
      wx.switchTab({
        url: '/pages/Books/main'
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.firstViewContainer
  width 100%
  height 100%
  position relative
  swiper
    width 100%
    height 100%
    img
      width 100%
      height 100%
  .btn
    width 200rpx
    height 80rpx
    color white
    background rgba(0, 0, 0, 0.3)
    position absolute
    left 50%
    bottom 30rpx
    margin-left -100rpx
</style>