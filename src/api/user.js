import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://47.96.147.99:8081/hbjk/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: 'http://47.96.147.99:8081/hbjk/getUserByToken',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
