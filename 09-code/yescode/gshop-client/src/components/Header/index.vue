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
            <!-- <a href="###"></a>
            <a href="###" class="register"></a> -->
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
        <router-link class="logo" to="/">
          <img src="./images/Logo.png" alt />
        </router-link>
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
  data () {
    return {
      // 指定搜索关键字,用来搜索的时候进行传参
      keyword:''  
    }
  },
  methods: {
    // 点击搜索按钮,跳转到Search路由组件界面
    toSearch(){
      // this.$router.push('/search')
      // 方案1的缺陷:每次路由跳转都要设置,push和replace解决原理相同
      // 方案1:只要指定成功的回调或者失败的回调该错误就不会出现
      // this.$router.push('/search',()=>{})
      // 指定失败的回调也可以
      // this.$router.push('/search',undefined,()=>{})
      // 指令失败的回调函数
      // this.$router.push('/search').catch(()=>{})
      // 方案2:在router目录的index.js文件中设置


      // this.$router.push('/search')


      // 使用params传参
      // this.$router.push(`/search/${this.keyword}`)
      // 跳转同时使用query进行传参
      // this.$router.push(`/search?keyword=${this.keyword}`)
      // 或者
      // this.$router.push({path:'/search',query:{keyword:this.keyword}})
 
      // 下面这种方式,需要在注册路由组件的时候指定name属性(router目录中的index.js文件中设置)
      // this.$router.push({name:'search',params:{keyword:this.keyword}})
      // 解决浏览器中出现的提示信息
      if(this.keyword){
        this.$router.push({name:'search',params:{keyword:this.keyword}})
      }else{
        this.$router.push({name:'search'})
      }
    }
  }
}
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