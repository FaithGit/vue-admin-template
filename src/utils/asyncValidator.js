
export function moblie(rule, value, callback) {
  var reg = new RegExp('^[0-9]*$') // 纯数字
  if (rule.required === false && value.length === 0) {
    callback()
  } else {
    if (!(value.length === 11)) {
      return callback(new Error('请输入11位手机号'))
    } else if (!reg.test(value)) {
      console.log(reg.test(value))
      return callback(new Error('不能包含字符串'))
    } else {
      callback()
    }
  }
}
