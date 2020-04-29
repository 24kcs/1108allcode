<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" ref="event" @mousemove="handleMove"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
// 引入throttle 从lodash
import throttle from 'lodash/throttle'
export default {
  name: 'Zoom',
  props: {
    imgUrl: String,
    bigImgUrl: String
  },
  // 页面加载完毕的生命周期回调
  mounted() {
    // 获取event的宽度,值是不变的,没有必要放在data对象中
    this.maskWidth = this.$refs.event.clientWidth / 2
    // console.log(this.maskWidth)
  },
  methods: {
    // 鼠标移动事件----通过节流进行优化操作
    handleMove: throttle(function(event) {
      // 获取鼠标移动事件的横纵坐标
      const { offsetX, offsetY } = event
      // 计算mask的宽度
      const maskWidth = this.maskWidth
      // 设置left和top值,让鼠标在遮挡层的中间位置
      let left = 0
      let top = 0
      left = offsetX - maskWidth / 2
      top = offsetY - maskWidth / 2
      // 限制left和top的范围
      if (left < 0) {
        left = 0
      } else if (left > maskWidth) {
        left = maskWidth
      }
      if (top < 0) {
        top = 0
      } else if (top > maskWidth) {
        top = maskWidth
      }
      // 获取mask 这个div
      const maskDiv = this.$refs.mask
      // 移动这个遮挡层
      maskDiv.style.left = left + 'px'
      maskDiv.style.top = top + 'px'

      // 获取右侧答题
      const bigImg = this.$refs.bigImg
      bigImg.style.left = -2 * left + 'px'
      bigImg.style.top = -2 * top + 'px'
    }, 50)
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #ccc;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>