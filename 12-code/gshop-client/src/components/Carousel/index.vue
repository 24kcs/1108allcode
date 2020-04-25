<template>
  <div class="swiper-container" id="sw1" ref="sw">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carouse in carouselList" :key="carouse.id">
        <img :src="carouse.imgUrl" alt />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>
<script>
// 引入Swiper
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: {
    carouselList: Array
  },
  // 页面加载的生命周期回调,内部的代码是在页面加载完毕后才执行
  mounted() {
    // 当前Carousel该组件创建了,此时必然会执行mounted的这个生命周期回调
    /*
    mounted回调执行了3次,
    ListContainer组件内部使用过一次该组件,该组件肯定是创建了,所以,mounted肯定会执行---1次
    Floor组件内部使用过一次该组件,该组件肯定是创建了,所以,mounted肯定会执行---1次,但是Floor组件在Home组件中通过循环遍历的方式产生了两次的Floor组件,所以,最终Floor组件通过遍历的方式,导致了Carousel该组件创建了2次----
    大轮播图有4个数据,楼层中的轮播图数据有3个

    明确mounted回调函数是怎么回事(内部的代码肯定是在页面加载后才执行),明确该回调中的代码会执行几次?(从组件创建到组件销毁就执行一次)
    
    ListContainer组件中 Carousel组件是如何创建的
    一开始ListContainer中使用的Carousel组件,内部中通过carouselList="banners"传入了数据,注意,banners有没有数据都不会影响该组件的创建,一开始banners是没有数据的,但是Carousel组件还是正常的创建(此时banners数据还在异步请求的路上或者是响应回来的路上,总之此时banners没有数据,但是Carousel组件已经开始创建了),一旦创建,就会进入到mounted生命周期回调中,而此时该组件接收的传入进来的数据就是0=================>坑---->此时banners传入到了Carousel组件内部通过props接收了,存储到了carouselList数组中,但是没有数据,没有数据,那么轮播图为什么可以正常的显示出来----->大坑1
    大坑1: 一开始组件创建,没有数据,数据是0,但是此时正在发送异步请求,组件被创建出来了,数据也已经响应回来了,此时该组件内部的这个数据carouselList的数据发生了变化了,一旦变化,必然进入到watch中,然后就是数据变化,页面更新,Swiper被创建了,轮播图的效果就出来了



    Floor组件中Carousel组件是如何创建的
    Floor组件是在Home组件中使用的,但是Floor组件的创建和该组件中使用的v-for指令关系非常大
    Floor组件中的v-for指令中的floors这个数据是一个数组,数组有数据,v-for指令执行才有意义(可以遍历,可以遍历才可以创建Floor组件)
    floors是数组,该数组的数据是从一开始就有的吗?没有,因为Home组件中的内容加载后才发送异步请求,获取floors数据,该数据存在了,此时Floor组件才开始创建,创建的时候floors数据被传入到Floor组件内部,那么Floor组件内部使用的Carousel组件并传入的数据是存在的,也就意味着:Carousel组件创建的时候,轮播图的数据已经存在了,此时进入到mounted回调的时候,内部是可以拿到轮播图的数据的,就是3个,一共是两次,每次3个数据,mounted内部的代码已经执行完毕了,而且数据没有再次的更新了,界面也就不会变化了(页面不会被重新渲染了)=========>  坑---->此时既然有数据,为什么轮播图不能正常的显示----大坑2
    大坑2:一开始组件没有被创建,没有数据,后来有数据了(已经有数据了),组件才被创建,组件创建出来的时候,数据已经存在了(此时异步请求的数据早就回来,所以才会创建组件),所以,当这个组件出现在页面的时候,数据没有再变化过,既然没有变化过,就不会执行watch中的代码,既然里面代码没有被执行,所以,Swiper也不会被创建,所以,楼层中的轮播图无效

    结果:mounted确实执行了三次,数据是0,3,3,   watch就执行一次
    解决问题:让watch监视的时候,立刻的执行当前的回调

    通过观察,发现:watch竟然执行了一次,什么时候执行watch(监视中的代码什么时候会进入呢?)
    通过分析,watch中的代码应该最少执行三次,为什么?该组件被创建了三次,数据也传入了三次,只要数据变化,必然会最少执行三次,但是结果只有一次,说明数据就变化了一次
    
    */
    //分析的结果: 第一次进入mounted的时候有4个数据,二次和三次都是3个数据,3个数据
    // 但是,真实的结果,不是这样的,第一次进入到mounted的时候,数据是0个,第二次和第三次进来的时候的数据都是3个
    // 真实结果实际上是正确的
    //
    // console.log('mounted', this.carouselList.length)
    // 猜测:watch执行了多少次?
  },
  watch: {
    carouselList: {
      handler() {
        // watch执行了4次,导致Swiper对象被创建4次
        // console.log('watch执行次数',this.carouselList.length)
        // 优化watch内部代码执行次数,如果没有数据,没必要创建Swiper
        if (this.carouselList.length === 0) return
        // console.log('watch执行次数',this.carouselList.length)
        this.$nextTick(() => {
          // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
          var mySwiper = new Swiper(this.$refs.sw, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }

    // carouselList() {
    //   console.log('watch中的代码,执行次数')
    //   this.$nextTick(() => {
    //     // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
    //     var mySwiper = new Swiper(this.$refs.sw, {
    //       loop: true, // 循环模式选项
    //       // 如果需要分页器
    //       pagination: {
    //         el: '.swiper-pagination'
    //       },
    //       // 如果需要前进后退按钮
    //       navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev'
    //       }
    //     })
    //   })
    // }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>