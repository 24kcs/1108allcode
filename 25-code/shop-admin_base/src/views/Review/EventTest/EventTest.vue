<template>
  <div>
    <h1>EventTest组件</h1>
    <!--原生事件和自定义事件
    此时针对的是html标签说的:
    原生事件:DOM标签中自带的(系统自带的)事件,如:click,在html标签上绑定事件监听(原生事件监听)
    自定义事件:DOM标签中系统没有这个事件,是自己定义的事件名字,及绑定对应的回调
    此时针对的是组件标签说的:
    组件标签:组件的名字放在<>中像标签一样使用,如:<Event1/>-----组件标签
    原生事件:首先是系统自带的事件,同时,在该事件名字后面使用.native,此时是组件标签的原生事件
    自定义事件:首先该事件名字可能是系统自带的,也可能是自己定义的,没有使用.navtive修饰
    例子: <Event @click.native="回调函数1" />-----click是组件标签的原生事件
    例子: <Event @click="回调函数2" />----click不是组件标签的原生事件
    -----------------------------
    例子: <Event @click="回调函数3" @xxx="回调函数4" /> --- 这里面的clik和xxx都是自定义事件

    原生事件和自定义事件的到底是怎么回事?  涉及到事件分发的问题
    原生事件,只要触发了,那么对应的回调函数中的代码会自动执行
    自定义事件,需要手动分发,那么对应的回调函数中的代码才会执行

    组件之间通信:原生事件/自定义事件/事件总线
    -->
    <!--html标签上只能绑定原生事件监听-->
    <button @click="showMsg1">测试原生事件</button>
    <hr/>
    <!--此时绑定的事件不是原生事件监听,所以,不会触发-->
    <!-- <Event1 @click="showMsg2" /> -->
    <hr/>
    <!--此时绑定的是原生事件监听,并且自动的绑定到了组件内部的根标签上,内部使用了事件委托-->
     <Event1 @click.native="showMsg3" />
     <!--触发组件标签的自定义事件,怎么办呢?-->
     <Event2 @click="showMsg4" @xxx="showMsg5" />
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  components: {
    Event1,
    Event2
  },

  methods: {
    // 按钮的原生点击事件对应的回调函数
    showMsg1(event) {
      alert('触发了' + event.target.innerHTML)
    },
    // 组件Event1的点击事件对应的回调函数
    showMsg2() {
      alert('Event1的点击事件')
    },
    // 组件Event1的点击事件加了.native 对应的回调函数
    showMsg3(event) {
      alert(event.target.innerHTML)
    },
    // 第二个组件的自定义事件监听回调
    showMsg4(text) {
      alert(text)
      alert('Event2的自定义事件click触发了')
    },
    showMsg5(obj) {
      alert('Event2的自定义事件xxx触发了,')
      alert(obj.age)
    }
  }
}
</script>
