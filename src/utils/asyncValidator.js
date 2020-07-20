
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
export function password(rule, value, callback) {
  var reg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$/) // 纯数字

  if (!reg.test(value)) {
    console.log(reg.test(value))
    return callback(new Error('必须包含大小写字母和数字的组合，可以使用字符，长度在6-14之间'))
  } else {
    callback()
  }
}
