/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
export function DateHandle(objDate) {
  objDate = new Date(objDate) // 创建一个日期对象表示当前时间
  var year = objDate.getFullYear() // 四位数字年
  var month = objDate.getMonth() + 1 // getMonth()返回的月份是从0开始的，还要加1
  var date = objDate.getDate()
  var hours = objDate.getHours()
  var minutes = objDate.getMinutes()
  var seconds = objDate.getSeconds()
  var fdate = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
  return fdate
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
// export function validUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }
