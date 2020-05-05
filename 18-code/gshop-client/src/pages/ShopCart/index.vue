<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item,index) in shopCartList" :key="item.id">
          <li class="cart-list-con1">
            <!-- <input type="checkbox" name="chk_list" v-model="item.isChecked" /> -->
            <!-- <input type="checkbox" name="chk_list" :checked="isChecked(index)" /> -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="checkCartItem(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeItemCount(item,-1)">-</a>
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="item.skuNum"
              @change="changeItemCount(item,$event.target.value*1-item.skuNum)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeItemCount(item,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuPrice*item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCartItem(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="checkAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{totalCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <a href="javascript:;" @click="toTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  computed: {
    ...mapState({
      shopCartList: state => state.shopcart.shopCartList
    }),
    ...mapGetters([
      'totalCount',
      'totalPrice',
      'isAllCheck',
      'selectedCartItems'
    ])
    // isChecked:{
    //   get(index){},
    //   set(val){
    //     // 对应的item设置选中状态的值
    //   }
    // }
  },
  mounted() {
    // 发送请求获取数据
    this.getShopCartList()
  },
  methods: {
    // 删除购物车某个商品的操作方法
    async deleteCartItem1(skuId) {
      // 友好的提示消息
      if (window.confirm('您确定要删除吗')) {
        const errorMsg = await this.$store.dispatch('deleteCartItem', skuId)
        if (!errorMsg) {
          // 成功了,则重新发送请求,获取购物车的数据
          this.getShopCartList()
        } else {
          alert(errorMsg)
        }
      }
    },
    async deleteCartItem(skuId) {
      // 友好的提示消息
      if (window.confirm('您确定要删除吗')) {
        try {
          await this.$store.dispatch('deleteCartItem', skuId)
          this.getShopCartList()
        } catch (error) {
          alert(error.message || '删除失败了')
        }
      }
    },
    // 删除所有选中的购物项操作方法
    deleteCartItems() {
      // 获取所有训中的购物项
      const { selectedCartItems } = this
      // 判断,如果没有选中的购物项,不做任何的处理
      if (selectedCartItems.length === 0) return
      // 友好的提示了
      if (window.confirm('您确定要删除吗')) {
        // 定义一个数组
        const promises = []
        // 发送异步请求,(对应的action每次只能干掉一个商品)
        selectedCartItems.forEach(item => {
          const promise = this.$store.dispatch('deleteCartItem2', item.skuId)
          // 保存返回的promise
          promises.push(promise)
        })
        // 所有的商品都删除成功了, 重新获取购物车的数据(再次请求)
        Promise.all(promises).then(
          values => {
            this.getShopCartList()
          },
          error => {
            alert(error.message || '删除不了啊')
          }
        )
      }
    },
    // 修改某个购物项的勾选状态
    checkCartItem(item) {
      // 先获取当前这个购物项的选中状态
      const isChecked = item.isChecked === 1 ? 0 : 1
      const { skuId } = item
      this.$store.dispatch('checkCartItem', { skuId, isChecked }).then(
        () => {
          // 修改选中状态成功,重新获取购物车商品列表数据
          this.getShopCartList()
        },
        error => {
          // 修改选中状态失败的情况
          alert(error.message)
        }
      )
    },
    // 改变所有购物项的选中状态
    async checkAll(event) {
      // console.log(event.target.checked)
      // 获取当前的这个复选框的选中状态(该选中状态是布尔类型,而我们需要的是数字类型的值:1/0)
      const isChecked = event.target.checked * 1
      // const promises = []
      // // 遍历当前所有的购物项,分发action,并传入skuId和isChecked
      // this.shopCartList.forEach(item => {
      //   // 遍历一个数据,那么就分发一次action
      //   const promise = this.$store.dispatch('checkCartItem', {
      //     skuId: item.skuId,
      //     isChecked
      //   })
      //   promises.push(promise)
      // })
      // 数组的reduce方法的方式
      // const promises = this.shopCartList.reduce((pre, item) => {
      //   const promise = this.$store.dispatch('checkCartItem', {
      //     skuId: item.skuId,
      //     isChecked
      //   })
      //   pre.push(promise)
      //   return pre
      // }, [])
      // 数组的map方法的方式
      const promises = this.shopCartList.map(item => {
        return this.$store.dispatch('checkCartItem', {
          skuId: item.skuId,
          isChecked
        })
      })
      try {
        await Promise.all(promises)
        this.getShopCartList() // 重新发送请求获取购物车的数据
      } catch (error) {
        alert(error.message)
      }
    },
    // 去结算
    toTrade(){
      this.$router.push('/trade')
    },
    // 修改购物项的数量方法
    // async changeItemCount(item, changeNum) {
    //   // 要调用接口,所以,要准备参数
    //   const { skuId } = item
    //   // 最好要判断修改后最终的数据一定要大于0
    //   if (item.skuNum + changeNum > 0) {
    //     // 分发action
    //     const errorMsg = await this.$store.dispatch('addToCart2', {
    //       skuId,
    //       skuNum: changeNum
    //     })
    //     if (!errorMsg) {
    //       // 修改数量已经成功,重新获取购物车中的数据列表了
    //       this.getShopCartList()
    //     } else {
    //       alert(errorMsg)
    //     }
    //   }
    // },
    //  修改购物项的数量方法
    changeItemCount(item, changeNum) {
      // 要调用接口,所以,要准备参数
      const { skuId } = item
      // 最好要判断修改后最终的数据一定要大于0
      if (item.skuNum + changeNum > 0) {
        // 分发action
        this.$store.dispatch('addToCart3', {skuId,skuNum: changeNum})
      }
    },

    // 封装一个方法,用来分发异步的action,获取购物车商品列表数据
    getShopCartList() {
      this.$store.dispatch('getShopCartList')
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>