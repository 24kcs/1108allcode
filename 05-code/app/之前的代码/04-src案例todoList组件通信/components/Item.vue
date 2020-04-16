<template>
  <li
    @mouseenter="mouseHandle(true)"
    @mouseleave="mouseHandle(false)"
    :style="{color:fontColor,backgroundColor:bgColor}"
  >
    <label>
      <input type="checkbox" v-model="isCheck" />
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">删除</button>
  </li>
</template>
<script>
// 引入PubSub
import PubSub from 'pubsub-js'
export default {
  name: 'Item',
  // 组件通信,props 方式, props不同的写法
  // props: {
  //   todo: Object, // 设置todo数据是对象的类型
  //   deleteTodo: Function,
  //   index: Number,
  //   toggleTodo: Function
  // },
  props: {
    todo: Object, // 设置todo数据是对象的类型
    index: Number
    // toggleTodo: Function
  },
  data () {
    return {
      fontColor: 'black', // 文字的颜色
      bgColor: 'white', // 背景颜色
      isShow: false // 默认按钮是隐藏的
    }
  },
  methods: {
    // 鼠标进入和离开的事件
    mouseHandle (flag) {
      if (flag) { // 鼠标进入事件
        this.fontColor = 'green'
        this.bgColor = 'pink'
        this.isShow = true
      } else { // 鼠标离开事件
        this.fontColor = 'black'
        this.bgColor = 'white'
        this.isShow = false
      }
    },
    // 删除数据
    delTodo () {
      // 友好的删除提示信息
      if (confirm('您确定删除吗')) {
        PubSub.publish('deleteTodo', this.index)
        // this.deleteTodo(this.index)
      }
    }
  },
  // 计算属性
  computed: {
    isCheck: {
      get () {
        return this.todo.isCompleted
      },
      set () {
        // console.log(this.$bus)
        this.$bus.$emit('toggleTodo', this.todo)
        // this.toggleTodo(this.todo)
      }
    }
  }
}
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
