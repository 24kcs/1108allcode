<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--分类信息的名字的显示-->
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}
              <i @click="removeCategory">×</i>
            </li>
            <!--关键字的内容的显示-->
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!--品牌信息的显示-->
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}
              <i @click="removeTrademark">×</i>
            </li>
            <!--搜索属性条件的显示-->
            <li class="with-x" v-for="(prop,index) in options.props" :key="prop">
              {{prop}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" :addProps="addProps" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActive('1')}" @click="setOrder('1')">
                  <a href="javascript:;">综合{{getOrderIcon('1')}}</a>
                </li>
                <li>
                  <a href="javascript:;">销量</a>
                </li>
                <li>
                  <a href="javascript:;">新品</a>
                </li>
                <li>
                  <a href="javascript:;">评价</a>
                </li>
                <li :class="{active:isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:;">价格{{getOrderIcon('2')}}</a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇ ⬆</a>
                </li>-->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="javascript:;">
                      <img :src="goods.defaultImg" />
                    </a>-->
                    <!-- <router-link :to="{name:'detail',params:{skuId:goods.id}}"> -->
                    <router-link :to="`/detail/${goods.id}`">
                      <!-- <img :src="goods.defaultImg" /> -->
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!-- <a href="javascript:;" :title="goods.title">{{goods.title}}</a> -->
                    <router-link :to="`/detail/${goods.id}`">{{goods.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a href="javascript:;" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页结构标签-->
          <!--此时传入的goodsList.length是错误的,原因:当前goodsList是当前第一页的一共数据的条数；5条-->

          <!-- <Pagination :pageConfig="{total:goodsList.length,showPageNo:3,pageNo:options.pageNo,pageSize:options.pageSize}" /> -->
          <!--所有商品数据的总条数:productList.total-->
          <!-- <Pagination
            :pageConfig="{total:productList.total,showPageNo:3,pageNo:options.pageNo,pageSize:options.pageSize}"
            @changeCurrentPage="changeCurrentPage"
          />-->
          <Pagination
            :pageConfig="{total:productList.total,showPageNo:3,pageNo:options.pageNo,pageSize:options.pageSize}"
            @changeCurrentPage="getProductList"
          />

          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted">
                  <span>...</span>
                </li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div>
                <span>共10页&nbsp;</span>
              </div>
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入搜索条件的组件
import SearchSelector from './SearchSelector/SearchSelector'
// 引入Vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Search',
  // 注册组件
  components: {
    SearchSelector
  },

  data() {
    return {
      // data对象中添加的数据,都叫响应式数据(数据发生变化了,页面会重新的渲染)
      options: {
        category1Id: '', // 一级分类的id
        category2Id: '', // 二级分类的id
        category3Id: '', // 三级分类的id
        categoryName: '', // 分类的名字
        // trademark: '', // 品牌      值:  "品牌id:品牌名字"--->"4:小米"
        order: '1:desc', // 排序方式  值: "1:desc" 1--综合,2--价格, asc--升序 desc--降序
        pageNo: 1, // 当前第几页   数字值
        pageSize: 10, // 每页多少条数据  数字值
        keyword: '', // 搜索关键字    在搜索框中输入的内容
        props: [] // 多个属性条件组成的数组, ["属性id:属性值:属性名字"]  "1:1700-2799:价格",
      }
    }
  },

  // 写方法的对象
  methods: {
    // 根据参数发送请求,获取数据的
    getProductList(pageNo = 1) {
      // 发送请求的时候,需要携带的页码数
      this.options.pageNo = pageNo
      this.$store.dispatch('getProductList', this.options) // 发送请求
    },
    // 重置分类信息
    removeCategory() {
      // 分类信息  一级分类id,二级分类id,三级分类id, 分类的信息名字
      this.options.category1Id = ''
      this.options.category2Id = ''
      this.options.category3Id = ''
      this.options.categoryName = ''
      // 重新发送请求
      // this.getProductList()  // 此时有bug,地址栏上的参数是没有清理的
      // 重新跳转当前界面,用于删除query参数,path可能包含keyword
      this.$router.replace(this.$route.path)
    },
    // 重置关键字信息
    removeKeyword() {
      // keyword要进行重置
      this.options.keyword = ''
      // 通过事件总线分发Header组件中的removeKeyword事件,目的:干掉Header组件中的搜索框中的内容
      this.$bus.$emit('removeKeyword')
      // 重新发送请求
      // this.getProductList() // 此时有bug,地址栏上的参数是没有清理的
      // 重新跳转当前页面,用于删除params参数
      this.$router.replace({ path: '/search', query: this.$route.query })
    },
    // 用来点击品牌的时候,增加搜索条件
    setTrademark(trademarkId, trademarkName) {
      // 最终应该是在请求的参数中,添加了品牌参数,重新发送请求
      // 设置品牌id和品牌名字,添加到请求接口对应的参数中
      // 4:小米
      // this.options.trademark = trademarkId + ':' + trademarkName
      // 重新获取商品列表数据--发送请求
      // this.getProductList()
      // 原因:响应式对象直接添加的属性,内部是没有监视/劫持的--->没有数据绑定
      // 解决:Vue.set()方法或者vm.$set()方法--->向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新
      // 此时this.options对象(响应式对象)添加了一个响应式属性trademark
      this.$set(this.options, 'trademark', trademarkId + ':' + trademarkName)
      // 重新获取商品列表数据--发送请求
      this.getProductList()
    },
    // 移除品牌信息操作
    removeTrademark() {
      // 请求的接口中的参数干掉
      // this.options.trademark = ''
      // 删除响应式数据是不会触发界面更新的
      // delete this.options.trademark
      // 删除响应式数据,界面应该会发生更新
      this.$delete(this.options, 'trademark')
      // 重新获取商品列表数据--发送请求
      this.getProductList()
    },
    // 用来点击属性条件,增加搜索条件,发送请求获取数据
    addProps(propId, propVal, propName) {
      const prop = `${propId}:${propVal}:${propName}`
      // 判断当前的属性是否在数组中,如果不在数组中,则添加该属性
      if (this.options.props.indexOf(prop) === -1) {
        // 修改接口的参数数据
        this.options.props.push(prop)
        // 发送请求
        this.getProductList()
      }
    },
    // 移除某个属性条件
    removeProp(index) {
      // 移除某个指定索引位置的搜索属性条件
      this.options.props.splice(index, 1)
      // 重新发送请求获取商品数据
      this.getProductList()
    },
    // 排序操作影响对应的条件被选中(综合,价格)
    isActive(flag) {
      return this.options.order.indexOf(flag) === 0
    },
    // 进行排序操作,根据标识来进行不同的排序操作
    setOrder(flag) {
      // 1--综合,2---价格  asc---升序, desc---降序
      // order: '1:desc'  '1:asc'   '2:asc'   '2:desc'
      // 干掉属性值的空格,获取排序的标识和排序的类型
      // const orders = this.options.order.split(':')
      // const orderFlag = orders[0] // 排序标识  1   2
      // const orderType = orders[1] // 排序的类型  asc  desc
      let [orderFlag, orderType] = this.options.order.split(':')
      // 判断传入的标识和当前的参数中截取出来的标识是否一致-----确实点击的是同一项
      // 1-综合  2-价格
      // 当前选中的比如是综合(1)----用户用鼠标再次点击的时候传入的是1---那就证明默认显示综合,此时用户点击的还是综合(升序和降序的操作)
      // 当前选中的比如是价格(2)----用户用鼠标点击的时候传入的是2---此时默认选中是价格,此时用户点击的还是价格(升序/降序的处理)
      // 当前选中的是综合(1)----用户用鼠标点击的时候传入的是2,肯定是切换的点击操作---综合--->价格
      if (orderFlag === flag) {
        // 此时点击的肯定是同一个排序内容,所以,切换排序类型就可以了
        orderType = orderType === 'desc' ? 'asc' : 'desc'
      } else {
        // 此时默认选中的是综合(1)---能进入到这里,说明用户点击的是价格(2)(也可以反过来)
        orderFlag = flag
        orderType = 'desc'
        // 假设:   '1:desc'    --->此时点击了价格了---->'2:desc'
      }
      // 重新更新请求里面对应的参数
      this.options.order = `${orderFlag}:${orderType}`
      // 发送请求
      this.getProductList()
    },
    // 排序的文本图标设置
    getOrderIcon(flag) {
      // 获取当前的参数中的标识及类型
      let [orderFlag, orderType] = this.options.order.split(':')
      if (orderFlag === flag) {
        return orderType === 'desc' ? '⬇' : '⬆'
      } else {
        return ''
      }
    }
    // 绑定事件,改变当前页面,发送请求获取该页数的数
    // changeCurrentPage(page){
    //   // 改变发送请求的时候传入的参数数据
    //   // page是第几页,那么我就发送请求获取第几页的数据
    //   // 如: page--->5  那现在就看第5也的数据
    //   //this.options.pageNo=page
    //   this.getProductList() // 发送请求
    // }
  },
  watch: {
    $route(to, from) {
      // 解构出query和params参数数据
      const { query, params } = to
      // 重新设置传递的参数,把query和params参数添加到options(重新覆盖的操作)
      const options = {
        ...this.options,
        category1Id: '', // 重置
        category2Id: '', // 重置
        category3Id: '', // 重置
        categoryName: '', // 重置
        ...query,
        ...params
      }
      // 更新参数对象数据
      this.options = options
      // this.$store.dispatch('getProductList', this.options) // 发送请求
      this.getProductList()
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['goodsList']), // 获取商品信息
    // 获取所有的商品信息对象============
    ...mapState({
      productList: state => state.search.productList
    })
  },
  // 页面加载后的生命周期回调
  mounted() {
    // Header组件内部点击搜索按钮跳转到Search组件的时候携带的是params参数,有关键字--keyword
    // TypeNav组件内部点击分类名字的时候跳转到Search组件的时候携带的是query参数,categoryName,(category1Id||category2Id||category3Id)
    // 由于跳转过来后,传递的参数有query也有可能有(都有)params
    const { query, params } = this.$route
    // 重新设置传递的参数,把query和params参数添加到options(重新覆盖的操作)
    const options = {
      ...this.options,
      ...query,
      ...params
    }
    // 更新参数对象数据
    this.options = options
    // this.$store.dispatch('getProductList', this.options) // 发送请求
    this.getProductList()
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>