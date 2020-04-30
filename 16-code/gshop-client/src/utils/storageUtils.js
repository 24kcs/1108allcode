// 引入UUID
import UUID from 'uuidjs'
// 生成临时用户id,并存储起来
export function getUUID () {
  // 从缓存中读取用户临时id数据
  let uuid = localStorage.getItem('UUID_KEY')
  if (!uuid) {
    // 产生了临时用户id--------长久保存---并且保持不变
    uuid = UUID.generate()
    // 直接进行缓存操作
    localStorage.setItem('UUID_KEY', uuid)
  }
  return uuid
}