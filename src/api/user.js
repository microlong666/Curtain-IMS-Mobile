import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function signUp(data) {
  return request({
    url: '/signup',
    method: 'post',
    data
  })
}

export function logOut() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
