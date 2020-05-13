// 1.导入 默认导出的模块
import test1 from './test1' // 简洁的写法
// 完整的写法
import { default as test11 } from './test1'

console.log(test1) // 对象结构
console.log('================')
console.log(test11) // 对象结构

console.log('===============')
// 2.导入  分别导出的模块
import { num1, f1 } from './test1'
console.log(num1)
console.log(f1)
console.log('+++++++++++++++++++++++++')
// import { name1, name2, name3, name4 } from './test1'
// 3.导入所有模块----这个方式不支持导出的
import * as obj from './test1'
console.log(obj) // 对象结构

