<template>
  <div>
    <div class="navContainer">
      <div class="nav">
        <router-link to="/home">Home</router-link>
      </div>
      <div class="nav">
        <!--params传参-->
        <!-- <router-link to="/about/123">About</router-link> -->
        <!--query传参-->
        <!-- <router-link to="/about?age=18">About</router-link> -->

        <!--meta传参-->
        <!-- <router-link to="/about">About</router-link> -->
        <!--props布尔方式传参-->
        <!-- <router-link to="/about/12345">About</router-link> -->
        <!--props对象方式传参-->
         <!-- <router-link to="/about">About</router-link> -->
         <!--props函数方式传参-->
          <router-link to="/about">About</router-link>
      </div>
    </div>
    <router-view></router-view>
    <!-- <p>params传参:{{$route.params.id}}</p>
    <p>query传参:{{$route.query.age}}</p>
    <p>meta传参:{{$route.meta.isShow}}</p> -->
  </div>
</template>
<script>
export default {
  name: 'App'
}

/**
 * 
 * $route:组件信息对象
 * 路由传参:
 * 1.params方式: 需要先在路由注册的时候,进行占位,同时通过组件对象调用$route对象来获取参数数据,params方式传参和组件的关系很密切(需要组件对象调用$route这个信息对象来获取相关的参数)
 * 2.query方式:在注册路由的时候,不需要占位,只写地址,需要通过组件对象调用$route对象来获取参数数据,query方式传参和组件关系很密切(需要组件对象调用$route这个信息对象来获取相关的参数)
 * 密切:耦合度比较高
 * 3.meta对象方式: 直接在注册路由的时候添加一个meta对象(自带meta对象,如果你需要则自己写上),路由链接中不需要写任何内容
 * 获取路由的参数,也需要$route对象,和组件的关系也很密切
 * 以上三种方式和组件的耦合度很高
 * 使用props的方式传参可以和组件进行解耦,关系不是很密切
 * 
 * 4.props的方式
 * 1.布尔写法;需要先设置props:true,可以把params参数放在props对象中,直接进行获取,和$route进行了解耦
 * 2.对象写法:在注册路由的时候可以把参数放在props对象中,组件内部props接收后可以直接使用,和$route进行了解耦
 * 3.函数写法:在注册路由的时候把参数放在props函数中,组件内部props接收后可以直接使用,和$route进行了解耦
 * 
 * 
 * 
 */


// vue脚手架中如何写stylus代码
// 先安装stylus 和stylus-loader 包  就可以直接在组件中书写stylus代码了
// npm install stylus stylus-loader
</script>
<style lang="stylus" rel="stylesheet/stylus">
.navContainer
  display flex
  top 0
  width 100%
  background-color #fff
  .nav
    width 50%
    height 80px
    line-height 80px
    text-align center
    border-bottom 2px solid red
    box-sizing border-box
</style>