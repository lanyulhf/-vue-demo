/**
 * 存储localStorage
 */

export const setStorage = (name, content) => {
  if (!name) {
    return
  }
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  localStorage.setItem(name, content)
}
/**
 * 获取localStorage
 */

export const getStorage = (name) => {
  if (!name) {
    return
  }
  return localStorage.getItem(name)
}
/**
 * 删除localStorage
 */

export const removeStorage = (name) => {
  if (!name) {
    return
  }
  return localStorage.removeItem(name)
}
