<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImg,index) in skuImageList" :key="skuImg.id">
        <img
          :src="skuImg.imgUrl"
          :class="{active:currentIndex===index}"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from 'swiper'
// 引入Vuex的辅助函数
import { mapGetters } from 'vuex'
export default {
  name: 'ImageList',
  data() {
    return {
      currentIndex: 0 // 当前图片的下标
    }
  },
  computed: {
    ...mapGetters(['skuImageList'])
  },
  watch: {
    skuImageList: {
      handler(val) {
        // watch执行了4次,导致Swiper对象被创建4次
        // console.log('watch执行次数',this.carouselList.length)
        // 优化watch内部代码执行次数,如果没有数据,没必要创建Swiper
        if (val.length === 0) return
        // console.log('watch执行次数',this.carouselList.length)
        this.$nextTick(() => {
          // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
          new Swiper(this.$refs.swiper, {
            slidesPerView: 5, // 一次显示5项
            slidesPerGroup: 2, // 每次以3个为单位进行翻页
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
  },
  methods: {
    changeCurrentIndex(index) {
      // 设置当前选中的图片的下标
      this.currentIndex = index
      // 分发自定义事件的方式,通知外部父级组件
      this.$emit('changeCurrentIndex', index)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>