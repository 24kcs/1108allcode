<template>
  <div class="bookListContainer">
    <ul>
      <li v-for="(book,index) in books" :key="index">
        <img :src="book.image" alt="">
        <div class="books_content">
          <p>《{{book.title}}》</p>
          <p>作者:{{book.author}}</p>
          <p>{{book.publisher}}</p>
        </div>
        <span class="price">{{book.price}}元</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      books:[]  
    }
  },
  // 页面加载的事件
  mounted () {
    // console.log(this)
    // this.$mp.query.books  中就有另一个组件路由跳转的时候传递过来的参数数据
    // 判断当前$mp是否存在
    if(this.$mp){
      this.books = JSON.parse(this.$mp.query.books)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.bookListContainer
  width 100%
  display flex
  ul
    width 100%
    li
      width 100%
      display flex
      padding 10rpx
      border-bottom 1rpx solid #666
      img
        width 140rpx
        height 140rpx
      .books_content
        width 60%
        margin-left 10rpx
        p
          font-size 36rpx
      .price
        color red
        font-size 36rpx
        font-weight 700

</style>