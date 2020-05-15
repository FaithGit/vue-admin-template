import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function findAllCom() { // 公司列表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findAllCom',
    method: 'POST'
  })
}
export function findAllCode() { // 监测因子
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findAllCode',
    method: 'POST'
  })
}
export function testJson(data) { // 测试工况表格提交
  return request({
    url: 'http://47.96.147.99:8081/hbjk/testJson',
    method: 'POST',
    data
  })
}
export function findData(data) { // 复杂表格
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findData',
    method: 'POST',
    data
  })
}
