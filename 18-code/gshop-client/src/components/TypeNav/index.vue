<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="isShowFirst=true" @mouseleave="firstHide">
        <h2 class="all">全部商品分类</h2>
        <transition name="move">
          <div class="sort" @mouseleave="currentIndex=-2" @click="toSearch" v-if="isShowFirst">
            <div class="all-sort-list2">
              <div
                class="item"
                v-for="(c1,index) in baseCategoryList"
                :key="c1.categoryId"
                :class="{item_on:currentIndex===index}"
                @mouseenter="showSubCategorys(index)"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                  <!-- <router-link
                :to="{path:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}"
                  >{{c1.categoryName}}</router-link>-->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                        <!-- <router-link
                      :to="{path:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}"
                        >{{c2.categoryName}}</router-link>-->
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                          <!-- <router-link
                        :to="{path:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}"
                          >{{c3.categoryName}}</router-link>-->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
// 引入lodash工具对象
// import _ from 'lodash'
// 按需引入的操作,只引入lodash库中的throttle的库
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      // 默认存储的索引值为-2,用来存储鼠标进入某个菜单后的当前菜单索引值
      currentIndex: -2,
      isShowFirst: true // 默认显示一级分类列表
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
    // 问题:首页,Search页面目前都发送了这个请求,没有必要,所以要进行优化请求次数
    // 提交对应的action,目的:为了获取三级分类信息数据
    // this.$store.dispatch('getBaseCategoryList')
    // 判断当前路径是不是/ ,决定是否显示
    if (this.$route.path !== '/') {
      this.isShowFirst = false
    }
  },
  methods: {
    // 所有的一级分类菜单的鼠标进入事件的回调函数
    // showSubCategorys(index) {
    //   this.currentIndex = index
    // }
    // 通过lodash对象调用throttle方法实现节流优化
    // showSubCategorys:_.throttle(function(index) {
    //   this.currentIndex = index
    //   console.log(index)
    // },300)
    // 按需引入的方式,使用throttle方法实现节流优化
    showSubCategorys: throttle(function(index) {
      this.currentIndex = index
      // console.log(index)
    }, 300),
    // 通过事件委托的方式实现编程式路由跳转同时携带对应的参数数据
    toSearch(event) {
      // 可以获取触发该事件的事件源对象的标签名字
      // console.dir(event.target.tagName)
      // 目前该事件确实可以在点击a标签的时候触发,但是,点击其他空白位置,竟然也可以触发
      if (event.target.tagName === 'A') {
        // 编程式路由跳转,同时,传递对应的query参数
        // 获取当前点击的a标签的自定义属性中的数据值
        const {
          categoryname,
          category1id,
          category2id,
          category3id
        } = event.target.dataset
        // 准备query参数
        const query = { categoryName: categoryname }
        // 判断对应的参数中是否有数据,有了数据才能准备query参数
        // 第一种写法:容易理解(基本)
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }

        // 问题:TypeNav组件内部跳转的时候,从来没有考虑过,query传参的时候path问题
        // 原因:路径/search,没有考虑过 /search/xxx这种情况
        // 先获取当前的路由地址
        const { path, params } = this.$route
        // 地址的可能性:   /search   /search/xxx
        if (path.indexOf('/search') === 0) {
          // 属于在search页面进行跳转
          // 如果已经在搜索页面,那就直接重新跳转,指定path为原本路径(可能存在params参数)
          this.$router.replace({ path, query, params }) // 说明此时的replace后退和push后退一样(原因在router.js中)
        } else {
          // 属于不在search页面进行跳转
          this.$router.push({ path: '/search', query })
        }

        // 重置当前的索引
        this.currentIndex = -2
        this.isShowFirst = false

        // 第二种写法:不容易理解(提升)---编程想法的提升
        // const id = category1id
        //   ? '1'
        //   : category2id
        //   ? '2'
        //   : category3id
        //   ? '3'
        //   : ''
        // query['category'+id+'Id'] = category1id || category2id || category3id

        // 编程式路由跳转,同时携带query参数
        // this.$router.push({ path: '/search', query })

        // const dt = event.target.dataset
        // 如果点击的是一级菜单category1id 中有数据
        // 如果点击的是二级菜单category2id 中有数据
        // 如果点击的是三级菜单category3id 中有数据
        // console.log(dt.categoryname, dt.category3id)
        // 跳转操作
        // this.$router.push({path:'/search'})

        // query参数:categoryName,category1Id,category2Id,category3Id

        // 如何获取当前点击的a标签上的categoryName和category(1||2||3)Id

        // 标签上是有一个属性可以用来存储需要的数据的,data-
      }
    },
    // 当鼠标离开分类列表,就隐藏这个一级分类列表
    firstHide() {
      // 重新设置索引值为-2
      this.currentIndex = -2
      if (this.$route.path !== '/') {
        this.isShowFirst = false
      }
    }
    // 控制一级分类列表只在首页显示(/),其他的页面中隐藏
    // 在Search组件内部引入当前组件
    // 必须要判断当前的路由地址(地址栏上的地址是不是/)再决定是否显示
    // 如何控制一级列表显示/隐藏,通过v-if的指令来进行控制

    // 当鼠标进入到分类列表中之后,要把一级分类列表展示出来,鼠标离开就隐藏起来
    // 鼠标进入和鼠标离开事件
  }
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
      &.move-enter-active,
      &.move-leave-active {
        transition: all .3s;
      }
      &.move-enter,
      &.move-leave-to {
        opacity: 0;
        height: 0;
      }
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