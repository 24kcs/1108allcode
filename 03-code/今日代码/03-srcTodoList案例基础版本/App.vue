<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo" />
      <Footer :todos="todos" :checkAllTodo="checkAllTodo" />
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
// 引入utils
import Storage from './utils/utils'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    List,
    Footer
  },
  data () {
    return {
      // todos: [
      //   { id: 1, title: '宝马', isCompleted: false },
      //   { id: 2, title: '奔驰', isCompleted: true },
      //   { id: 3, title: '奥迪', isCompleted: false }
      // ]
      // todos: JSON.parse(localStorage.getItem('todos_key') || '[]')
      todos: Storage.getTodos()
    }
  },
  methods: {
    // 添加数据方法
    addTodo (todo) {
      this.todos.unshift(todo)
    },
    // 删除数据
    deleteTodo (index) {
      this.todos.splice(index, 1)
    },
    // 切换操作
    toggleTodo (todo) {
      todo.isCompleted = !todo.isCompleted
    },
    // 全选
    checkAllTodo (flag) {
      this.todos.forEach(todo => {
        todo.isCompleted = flag
      })
    }
  },
  watch: {
    todos: {
      deep: true,
      // handler (val) {
      //   localStorage.setItem('todos_key', JSON.stringify(this.todos))
      // }
      handler: Storage.setTodos
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
