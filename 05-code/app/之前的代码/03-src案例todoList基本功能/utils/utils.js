export default {
  // 获取todos数据
  getTodos () {
    return JSON.parse(localStorage.getItem('todos_key') || '[]')
  },
  // 设置todos数据
  setTodos (val) {
    localStorage.setItem('todos_key', JSON.stringify(val))
  }
}
