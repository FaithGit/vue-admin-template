
function isRealNum(val) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，

  if (val === '' || val == null) {
    return false
  }
  if (!isNaN(val)) {
    // 对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
    // 所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
    return true
  } else {
    return false
  }
}

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
  var reg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$/)

  if (!reg.test(value)) {
    console.log(reg.test(value))
    return callback(new Error('必须包含大小写字母和数字的组合，可以使用字符，长度在6-14之间'))
  } else {
    callback()
  }
}
export function lonAndLat(rule, value, callback) {
  const arr = value.split(',')
  console.log(arr)
  var temp1 = isRealNum(arr[0])
  var temp2 = isRealNum(arr[1])
  if (arr.length === 2) {
    if (temp1 && temp2) {
      callback()
    } else {
      if (temp1) {
        return callback(new Error('请检查经度格式'))
      } else {
        return callback(new Error('请检查维度格式'))
      }
    }
  } else {
    return callback(new Error('请填写正确的经纬度格式, 逗号需要英文字符'))
  }
}
