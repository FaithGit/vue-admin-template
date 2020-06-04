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
export function findComMap(data) { // 拿取点位
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findComMap',
    method: 'POST',
    data
  })
}
export function findMapDataDetail(data) { // 拿取点位
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findMapDataDetail',
    method: 'POST',
    data
  })
}
export function findIndexTotalData(data) { // 首页的6个数据
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findIndexTotalData',
    method: 'POST',
    data
  })
}
export function warMonthSort(data) { // 异常数据
  return request({
    url: 'http://47.96.147.99:8081/hbjk/warMonthSort',
    method: 'POST',
    data
  })
}
export function selectByComId(data) { // 拿设备
  return request({
    url: 'http://47.96.147.99:8081/hbjk/selectByComId',
    method: 'POST',
    data
  })
}
export function findDataHistory(data) { // 历史数据
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findDataHistory',
    method: 'POST',
    data
  })
}
export function selectAllGroups(data) { // 查询所有生产线组
  return request({
    url: 'http://47.96.147.99:8081/hbjk/selectAllGroups',
    method: 'POST',
    data
  })
}
