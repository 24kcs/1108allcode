// 1. ES6模块化导出(暴露)与导入(引入)的深入理解和使用
// 1. 默认导出(只能有一个)
export default {
  age: 18 // 年龄
}
// 2. 分别导出(可以有多个)
export const num1 = 10
export function f1() { }
// 3. 统一导出(可以有多个)
const name1 = '小白'
const name2 = '小黑'
export {
  name1,
  name2
}
const name3 = '小绿'
const name4 = ' 小红'
export {
  name3,
  name4
}
