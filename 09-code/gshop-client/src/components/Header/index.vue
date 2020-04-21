<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
            <!-- <a href="###">登录</a>
            <a href="###" class="register">免费注册</a>-->
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/Logo.png" alt />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: '' // 搜索关键字
    }
  },
  // 方法
  methods: {
    // 跳转到Search组件界面
    toSearch() {

      
      // 编程式路由进行跳转
      // this.$router.push('/search') // 此时如果多次点击按钮进行编程式的路由跳转,控制台中会出现错误信息
      // 方案1,每次路由跳转都要设置,一个成功的回调或者失败的回调(push和replace解决原理相同)
      // this.$router.push('/search',()=>{}) // 传入成功的回调
      // this.$router.push('/search',undefined,()=>{}) // 传入失败的回调
      // this.$router.push('/search').then(()=>{}) 调用then()传入回调无法解决
      // this.$router.push('/search').catch(()=>{}) // 指定一个catch()传入回调可以解决
      // this.$router.push('/search',()=>{ // 成功的回调内部的代码是可以执行
      //   console.log('华华最近又腰疼了')
      // })
      //
      // this.$router.replace('/search')
      // 方案2,使用统一种方式解决项目中所有的路由的跳转的bug---去router目录中的index.js文件中为路由器重写push或者replace方法
      // this.$router.push('/search')

      // 路由传参:params,query,props,meta

      // 路由传参:params
      // this.$router.push('/search/123')
      // this.$router.push(`/search/${this.keyword}`)
      // 路由传参:query传参
      // this.$router.push(`/search?keyword=${this.keyword}`)
      

      this.$router.push(`/search/${this.keyword}`)
    }
  }
}

// 路由器一旦注册后,每个组件中都会出现两个对象
// $router 路由器对象,可以调用相关的方法,实现编程式的路由跳转
// $route 路由组件信息对象,可以获取路由传递的参数数据信息
</script>
<style lang="less" rel="stylesheet/less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .typeList {
        float: right;
        a {
          padding: 0 10px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .logoArea {
      float: left;
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;
          &:focus {
            outline: none;
          }
        }
        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>