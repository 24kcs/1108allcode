<template>
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <div class="sort" @mouseleave="currentIndex=-2">
        <div class="all-sort-list2">
          <div
            class="item"
            v-for="(c1,index) in baseCategoryList"
            :key="c1.categoryId"
            :class="{item_on:currentIndex===index}"
            @mouseenter="currentIndex=index"
          >
            <h3>
              <!-- <a href>{{c1.categoryName}}</a> -->
              <router-link :to="{path:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}">{{c1.categoryName}}</router-link>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                  <dt>
                    <!-- <a href>{{c2.categoryName}}</a> -->
                       <router-link :to="{path:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}">{{c2.categoryName}}</router-link>
                  </dt>
                  <dd>
                    <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                      <!-- <a href>{{c3.categoryName}}</a> -->
                        <router-link :to="{path:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}">{{c3.categoryName}}</router-link>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
// 引入Vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data() {
    return {
      // 默认存储的索引值为-2,用来存储鼠标进入某个菜单后的当前菜单索引值
      currentIndex: -2
    }
  },
  computed: {
    // ...mapState(['state']) 适合总的state中的数据的写法
    // 通过辅助函数mapState获取home模块中的三级分类信息数据
    ...mapState({
      baseCategoryList: state => state.home.baseCategoryList
    })
  },
  // 页面加载后
  mounted() {
    // 提交对应的action,目的:为了获取三级分类信息数据
    this.$store.dispatch('getBaseCategoryList')
  }







  // 问题1:点击菜单的时候,路由跳转,同时实现query的方式进行传参
  // 都跳转到了search界面  query方式传参  categoryName,category1Id,category2Id,category3Id
  // ?categoryName=图书、音像、电子书刊&category1Id=1
  // ?categoryName=电子书刊&category2Id=1
  // ?categoryName=电子书&category3Id=1
  // 问题2:鼠标在一级菜单上切换,出现了卡顿的问题,-----多层v-for嵌套的同时内部生成了大量的路由链接
  // 每次鼠标快速移动菜单的时候,不停的触发菜单的鼠标进入事件(减少事件的不必要的触发的问题)--函数的节流,函数的防抖

 
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                &.fore {
                  border-top: 0;
                }
                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }
                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          &.item_on {
            background-color: gray;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>