import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function findAllCom() {
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findAllCom',
    method: 'POST'
  })
}
export function findAllCode() {
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findAllCode',
    method: 'POST'
  })
}
export function testJson(data) {
  return request({
    url: 'http://47.96.147.99:8081/hbjk/testJson',
    method: 'POST',
    data
  })
}
