<template>
  <ul class="todo-main">
    <!-- <Item v-for="(todo,index) in todos" :key="index" :todo="todo" :deleteTodo="deleteTodo" :index="index" :toggleTodo="toggleTodo" /> -->

     <Item v-for="(todo,index) in todos" :key="index" :todo="todo" :index="index" />
  </ul>
</template>
<script>
// 引入Item 组件
import Item from './Item'
export default {
  name: 'List',
  // 注册组件
  components: {
    Item
  },
  // 实现组件之间通信,传递数据
  // props: ['todos', 'deleteTodo', 'toggleTodo']
  props: ['todos']
}
</script>
<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
