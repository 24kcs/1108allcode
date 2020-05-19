<template>
  <div class="booksContainer">
    <!--头部-->
    <div class="books_header">
      <swiper indicator-dots autoplay circular>
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
    </div>
    <!--中间部分-->
    <div class="books_content">
      <span>全部商品</span>
      <span class="right" @click="goBookList">更多 ></span>
    </div>
    <!--下面的列表部分-->
    <ul class="books_list">
      <li v-for="(book,index) in books" :key="index">
        <img :src="book.image" alt />
        <p>《{{book.title}}》</p>
        <p>作者:{{book.author}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
// 引入
import datas from './datas/data.json'
export default {
  data() {
    return {
      books: [] // 用来存储书籍数组数据的
    }
  },
  // 页面加载后就应该获取了数据
  mounted() {
    this.books = datas
    // console.log(this.books)
  },
  methods: {
    // 跳转到书籍列表界面,同时把当前的书籍的数据传递过去(路由跳转并传参)
    goBookList(){
      wx.navigateTo({
        url: '/pages/BookList/main?books='+JSON.stringify(this.books)
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.booksContainer
  width 100%
  height 100%
  .books_header
    width 100%
    height 400rpx
    swiper
      width 100%
      height 100%
      img
        width 100%
        height 100%
  .books_content
    margin 10rpx
    span
      font-size 36rpx
      font-weight 700
      &.right
        color #02a774
        float right
  .books_list
    display flex
    flex-wrap wrap
    li
      display flex
      flex-direction column
      align-items center
      width 50%
      border-bottom 1rpx solid #666
      box-sizing border-box
      &:nth-child(2n+1)
        border-right 1rpx solid #666
      img
        width 170rpx
        height 170rpx
        margin 10rpx 0
      p
        font-size 32rpx
        margin 10rpx 0
</style>