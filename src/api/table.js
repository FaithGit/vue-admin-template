import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function findAllCom(data) { // 公司列表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findAllCom',
    method: 'POST',
    data
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
export function addGroup(data) { // 添加生产线组
  return request({
    url: 'http://47.96.147.99:8081/hbjk/addGroup',
    method: 'POST',
    data
  })
}
export function deleteGroup(data) { // 删除生产线组
  return request({
    url: 'http://47.96.147.99:8081/hbjk/deleteGroup',
    method: 'POST',
    data
  })
}
export function updateGroup(data) { // 更新生产线组
  return request({
    url: 'http://47.96.147.99:8081/hbjk/updateGroup',
    method: 'POST',
    data
  })
}
export function selectAllCom(data) { // 查询企业信息列表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/selectAllCom',
    method: 'POST',
    data
  })
}
export function deleteCom(data) { // 删除公司
  return request({
    url: 'http://47.96.147.99:8081/hbjk/deleteCom',
    method: 'POST',
    data
  })
}
export function addCom(data) { // 添加公司
  return request({
    url: 'http://47.96.147.99:8081/hbjk/addCom',
    method: 'POST',
    data
  })
}
export function updateCom(data) { // 更新公司
  return request({
    url: 'http://47.96.147.99:8081/hbjk/updateCom',
    method: 'POST',
    data
  })
}
export function deleteSmsPerson(data) { // 删除短信人
  return request({
    url: 'http://47.96.147.99:8081/hbjk/deleteSmsPerson',
    method: 'POST',
    data
  })
}
export function findSysBus(data) { // 行业列表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findSysBus',
    method: 'POST',
    data
  })
}
export function findDataGyt(data) { // 查询工艺图接口
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findDataGyt',
    method: 'POST',
    data
  })
}
