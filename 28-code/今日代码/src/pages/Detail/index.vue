<template>
  <div class="detailContainer">
    <p class="book_name">{{book.title}}</p>
    <img :src="book.image" alt />
    <div class="book_info">
      <span>{{book.author}}</span>
      <span>{{book.publisher}}</span>
      <span>{{book.pubdate}}</span>
      <span>{{book.price}}</span>
    </div>
    <button @click="handleCollection">收藏</button>
    <article class="book_">
      <h1>作者简介</h1>
      <section>{{book.author_intro}}</section>
    </article>
    <article class="book_">
      <h1>书籍简介</h1>
      <section>{{book.summary}}</section>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {
      book: {},
      index: null,
      isShow: false
    }
  },
  mounted() {
    // 获取传入的参数
    if (this.$mp) {
      this.book = JSON.parse(this.$mp.query.book)
      // 需要自己传进来
      this.index = this.$mp.query.index
      let storageObj = wx.getStorageSync('isShow')
      if (!storageObj) {
        storageObj = {}
        wx.setStorage({
          key: 'isShow',
          data: storageObj
        })
      } else {
        if (storageObj[this.index]) {
          let isShow = storageObj[this.index]
          if (isShow) {
            console.log('测试', isShow)
            this.isShow = isShow
          } else {
          }
        }
      }
    }
  },
  methods: {
    handleCollection() {
      let isShow = !this.isShow
      let title = isShow ? '收藏成功' : '取消收藏'
      let obj = wx.getStorageSync('isShow') || {}
      obj[this.index] = isShow
      wx.setStorage({
        key: 'isShow',
        data: obj
      })
      wx.showToast({
        title,
        icon: 'success'
      })
    }
  },
  beforeDestroy() {
    console.log('销毁了')
  },
  onUnload() {
    console.log('释放了')
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.detailContainer
  display flex
  flex-direction column
  .book_name
    font-size 40rpx
    font-weight 700
    text-align center
    line-height 80rpx
  img
    width 70%
    height 700rpx
    margin 20rpx auto
  .book_info
    display flex
    flex-direction column
    font-size 32rpx
    width 100%
    padding-left 15%
  button
    width 300rpx
    height 60rpx
    font-size 32rpx
    line-height 60rpx
    margin 20rpx auto
  article
    width 100%
    padding 10%
    box-sizing border-box
    h1
      text-align center
      color #02a774
      font-weight 700
    section
      font-size 34rpx
      text-indent 34rpx
</style>