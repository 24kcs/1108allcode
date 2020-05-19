<template>
  <div class="detailContainer">
    <p class="book_name">{{book.title}}</p>
    <img :src="book.image" alt="">
    <div class="books_info">
      <p>{{book.author}}</p>
      <p>{{book.publisher}}</p>
      <p>{{book.pubdate}}</p>
      <p>{{book.price}}元</p>
    </div>
    <button @click="handleCollection">收藏</button>
    <article class="book">
      <h1>作者简介</h1>
      <section>{{book.author_intro}}</section>
    </article>
      <article class="book">
      <h1>书籍简介</h1>
      <section>{{book.summary}}</section>
    </article>
  </div>
</template>
<script>
export default {
  data () {
    return {
      book:{}, // 用来存储书籍的对象数据  
      index:null // 用来存储当前传递过来的索引数据
    }
  },
  mounted () {
   // 判断当前传递进来的数据是否存在
   if(this.$mp){
     this.book = JSON.parse(this.$mp.query.book) // 书籍对象数据
     this.index = this.$mp.query.index // 索引数据
   }
  },
  methods: {
    // 点击按钮,实现收藏的操作
    handleCollection(){
      //  留给大家自己做
    }
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
  .books_info
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