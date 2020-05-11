// import 导入
// export 导出
// 1.导入 默认导出的模块
// 完整的写法
// import { default as test11 } from './test1'
// 1. 导入并导出 默认导出的模块
export { default as test11 } from './test1'

// 2.导入  分别导出的模块
// import { num1, f1 } from './test1'
// 2.导入并导出  分别导出的模块
export { num1, f1 } from './test1'

// 3.导入所有模块----这个方式不支持导出的
// import { name1, name2, name3, name4 } from './test1'
// 3. 导入并导出 统一导出的模块
export { name1, name2, name3, name4 } from './test1'
