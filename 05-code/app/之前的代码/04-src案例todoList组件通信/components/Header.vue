<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" v-on:keyup.13="add" />
  </div>
</template>
<script>
export default {
  name: 'Header',
  // props: {
  //   addTodo: {
  //     type: Function, // 设置当前的addTodo的类型是Function
  //     required: true // 这个方法是必须的
  //   }
  // },
  data () {
    return {
      title: '' // 用来存储文本框的数据
    }
  },
  // 书写方法的对象
  methods: {
    // 添加数据的方法
    add () {
      // 干掉空格
      const title = this.title.trim()
      // 判断文本框中录入的数据是否为空
      if (title) {
        const todo = {
          id: Date.now(),
          title,
          isCompleted: false
        }
        // 调用父级组件传递过来的添加数据的方法
        // this.addTodo(todo)
        // 手动的分发该事件
        // 参数1:事件类型(事件名字),参数2:事件对应的回调函数要使用的参数
        // this是当前组件的实例对象,组件也是对象,所有的组件的实例都继承自Vue的实例
        this.$emit('addTodo', todo)
        // console.log(this)
        // 清空文本框的数据
        this.title = ''
      }
    }
  }
}
</script>
<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
