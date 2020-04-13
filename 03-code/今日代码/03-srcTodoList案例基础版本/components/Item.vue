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
    <button class="btn btn-danger" v-show="isShow" @click="del">删除</button>
  </li>
</template>
<script>
export default {
  name: 'Item',
  props: {
    todo: Object,
    deleteTodo: Function,
    index: Number,
    toggleTodo: Function
  },
  data () {
    return {
      fontColor: 'black',
      bgColor: 'white',
      isShow: false
    }
  },
  methods: {
    // 鼠标进入和离开事件
    mouseHandle (flag) {
      if (flag) {
        this.bgColor = 'gray'
        this.fontColor = 'pink'
        this.isShow = true
      } else {
        this.bgColor = 'white'
        this.fontColor = 'black'
        this.isShow = false
      }
    },
    // 删除操作
    del () {
      if (confirm('确定要删除吗')) {
        this.deleteTodo(this.index)
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
        this.toggleTodo(this.todo)
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
