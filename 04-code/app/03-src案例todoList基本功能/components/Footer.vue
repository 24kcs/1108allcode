<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="checkAll" />
    </label>
    <span>
      <span>已完成{{count}}</span> / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  props: {
    todos: Array,
    checkAllTodo: Function
  },
  // 计算属性
  computed: {
    // 已经完成的数量(选中的个数)
    count () {
      return this.todos.reduce((pre, todo) => pre + (todo.isCompleted ? 1 : 0), 0)
    },
    // 全选/全不选的计算属性
    checkAll: {
      get () {
        return this.count === this.todos.length && this.count > 0
      },
      set (val) {
        this.checkAllTodo(val)
      }
    }
  }
}
</script>
<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
