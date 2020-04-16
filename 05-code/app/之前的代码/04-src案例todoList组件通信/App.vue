<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--使用子级组件-->
      <Header @addTodo="addTodo" />
      <List :todos="todos" />
      <!-- <Footer :todos="todos" :checkAllTodo="checkAllTodo" /> -->
      <Footer :todos="todos">
        <label slot="left">
          <input type="checkbox" v-model="checkAll" />
        </label>
        <span slot="center">
          <span>已完成{{count}}</span>
          / 全部{{todos.length}}
        </span>
        <button class="btn btn-danger" slot="right">清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入List组件
import List from './components/List'
// 引入Footer组件
import Footer from './components/Footer'
// 引入utils暴露的对象
import Storage from './utils/utils.js'
// 引入PubSub
import PubSub from 'pubsub-js'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    List,
    Footer
  },
  // 数据对象
  data() {
    return {
      // 定义数据
      // todos: [
      //   { id: 1, title: '宝马', isCompleted: false },
      //   { id: 2, title: '奔驰', isCompleted: true },
      //   { id: 3, title: '奥迪', isCompleted: false }
      // ]
      // todos: JSON.parse(localStorage.getItem('todos_key') || '[]')
      todos: Storage.getTodos()
    }
  },
  // 书写方法的对象
  methods: {
    // 添加数据
    addTodo(todo) {
      this.todos.unshift(todo)
    },
    // 删除数据
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    // 切换操作(选中/不选中)
    toggleTodo(todo) {
      todo.isCompleted = !todo.isCompleted
    },
    // 全选/全不选
    checkAllTodo(flag) {
      this.todos.forEach(todo => {
        todo.isCompleted = flag
      })
    }
  },
  // todos数组数据发生变化,就要缓存数据,某个数据发生变化,要做一些操作----监视
  watch: {
    todos: {
      deep: true, // 深度监视
      // handler: function (val) { // 要执行的相关操作
      //   // 缓存数据
      //   // localStorage.setItem('todos_key', JSON.stringify(this.todos))
      //   Storage.setTodos(val)
      // }
      handler: Storage.setTodos
    }
  },
  // 页面加载完毕
  mounted() {
    // 消息订阅的方式删除数据
    this.token = PubSub.subscribe('deleteTodo', (msg, data) => {
      // 删除数据
      this.deleteTodo(data)
    })
    // 通过事件总线的方式来绑定事件
    // console.log(this.$bus)
    this.$bus.$on('toggleTodo', todo => {
      this.toggleTodo(todo)
    })
  },
  // 销毁之前的生命周期钩子---回调
  beforeDestroy() {
    // 取消消息订阅
    PubSub.unsubscribe(this.token)
    // 解绑事件
    this.$bus.$off('toggleTodo')
  },
  computed: {
    // 已经完成的数量(选中的个数)
    count() {
      return this.todos.reduce(
        (pre, todo) => pre + (todo.isCompleted ? 1 : 0),
        0
      )
    },
    // 全选/全不选的计算属性
    checkAll: {
      get() {
        return this.count === this.todos.length && this.count > 0
      },
      set(val) {
        this.checkAllTodo(val)
      }
    }
  }
}
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
