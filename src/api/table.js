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
export function addBoard(data) { // 测试工况表格提交
  return request({
    url: 'http://47.96.147.99:8081/hbjk/addBoard',
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
export function findProncess(data) { // 查询设备工艺类型接口
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findProncess',
    method: 'POST',
    data
  })
}
export function findBoards(data) { // 查询所有板子配置表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findBoards',
    method: 'POST',
    data
  })
}
export function deleteBoards(data) { // 删除板子工况配置表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/deleteBoards',
    method: 'POST',
    data
  })
}
export function findComBasicData(data) { // 删除板子工况配置表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findComBasicData',
    method: 'POST',
    data
  })
}
export function deleteSysdevice(data) { // 删除设备信息
  return request({
    url: 'http://47.96.147.99:8081/hbjk/deleteSysdevice',
    method: 'POST',
    data
  })
}
export function addSysdevice(data) { // 新增设备信息
  return request({
    url: 'http://47.96.147.99:8081/hbjk/addSysdevice',
    method: 'POST',
    data
  })
}
export function updateByDeviceId(data) { // 更新备信息
  return request({
    url: 'http://47.96.147.99:8081/hbjk/updateByDeviceId',
    method: 'POST',
    data
  })
}
export function addSysCondition(data) { // 新增工况配置表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/sysCondition/addSysCondition',
    method: 'POST',
    data
  })
}
export function deleteSysCondition(data) { // 删除工况配置表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/sysCondition/deleteSysCondition',
    method: 'POST',
    data
  })
}
export function updateSysCondition(data) { // 更新工况配置表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/sysCondition/updateSysCondition',
    method: 'POST',
    data
  })
}
export function findComElc(data) { // 查询获取企业用电量概况
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findComElc',
    method: 'POST',
    data
  })
}
export function findScSwitchData(data) { // 查询企业首页近六小时生产情况
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findScSwitchData',
    method: 'POST',
    data
  })
}
export function findUseElcByGroup(data) { // 查询企业生产治理用电根据组
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findUseElcByGroup',
    method: 'POST',
    data
  })
}
export function findComDeviceRealData(data) { // 企业设备实时状态
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findComDeviceRealData',
    method: 'POST',
    data
  })
}
export function findComDeviceWarRange(data) { // 企业设备异常次数排名
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findComDeviceWarRange',
    method: 'POST',
    data
  })
}
export function deletePicture(data) { // 删除图片
  return request({
    url: 'http://47.96.147.99:8081/hbjk/deletePicture',
    method: 'POST',
    data
  })
}
export function findDeviceNumByProcess(data) { // 环保局管理局首页生产治理设备按工业划分
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findDeviceNumByProcess',
    method: 'POST',
    data
  })
}
export function findMonthSmsNum(data) { // 环保局管理局首页生产治理设备按工业划分
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findMonthSmsNum',
    method: 'POST',
    data
  })
}
export function findHbjBasicData(data) { // 查询环保局首页企业及设施监测数据
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findHbjBasicData',
    method: 'POST',
    data
  })
}
export function findComNumBusDstbt(data) { // 查询环保局首页企业及设施监测数据
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findComNumBusDstbt',
    method: 'POST',
    data
  })
}
export function findComBus(data) { // 查询企业行业
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findComBus',
    method: 'POST',
    data
  })
}
export function findPictureDynamicInfo(data) { // 查询一张图动态信息
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findPictureDynamicInfo',
    method: 'POST',
    data
  })
}
export function findDeviceWarRange(data) { // 环保局首页异常治理设施排名接口
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findDeviceWarRange',
    method: 'POST',
    data
  })
}
export function findComWarRange(data) { // 环保局首页异常企业排名接口
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findComWarRange',
    method: 'POST',
    data
  })
}
export function findPictureAdminWarRange(data) { // 环保局首页异常企业排名接口
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findPictureAdminWarRange',
    method: 'POST',
    data
  })
}

export function findAlldAministrativeCode(data) { // 环保局首页异常企业排名接口
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findAlldAministrativeCode',
    method: 'POST',
    data
  })
}
export function selectUserList(data) { // 查询所有用户列表
  return request({
    url: 'http://47.96.147.99:8081/hbjk/selectUserList',
    method: 'POST',
    data
  })
}
export function findAllRoles(data) { // 查找所有角色
  return request({
    url: 'http://47.96.147.99:8081/hbjk/findAllRoles',
    method: 'POST',
    data
  })
}
export function addUser(data) { // 新增用户
  return request({
    url: 'http://47.96.147.99.:8081/hbjk/addUser',
    method: 'POST',
    data
  })
}
export function deleteUser(data) { // 删除用户
  return request({
    url: 'http://47.96.147.99.:8081/hbjk/deleteUser',
    method: 'POST',
    data
  })
}
export function updateUser(data) { // 更新用户
  return request({
    url: 'http://47.96.147.99:8081/hbjk/updateUser',
    method: 'POST',
    data
  })
}
export function updateAllDevice(data) { // 更新设备信息
  return request({
    url: 'http://47.96.147.99:8081/hbjk/updateAllDevice',
    method: 'POST',
    data
  })
}
