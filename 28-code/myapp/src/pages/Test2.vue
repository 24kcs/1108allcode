<template>
  <div>
    第二个组件
  </div>
</template>
<script>
export default {
  // 函数,可以被调用----组件创建的时候,初始化数据,data函数就可以被调用,返回的是一个对象,当前的这个组件实例对象中的数据就在data中定义的,可以正常使用
  data () {
    return {
      age:100
    }
  }
  // 当前组件被调用一次  当前组件又调用一次---存储的是引用,同一个组件,有多个其他组件去调用当前的组件（多个组件实例对象）,其中某个组件实例对象修改了data对象中的数据,其他的组件对象内部的data数据会发生变化,就不能保证当前的这个组件用自己的数据了
 //  Test2 组件  3个    1   2   3
  // data:{---对象----存储的应该是引用地址

  // }

}
</script>
<style scoped>
</style>