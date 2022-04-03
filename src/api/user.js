import request from '@/utils/request'

/**
 * 登录接口
 * @param {username, password} data 
 * @returns token
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * 注册接口
 * @param {username, phone, password} data 
 * @returns 
 */
export function signUp(data) {
  return request({
    url: '/signup',
    method: 'post',
    data
  })
}

/**
 * 登出接口
 * @returns
 */
export function getUserInfo() {
  return request({
    url: '/rest/system/currentUserInfo',
    method: 'get'
  })
}

/**
 * 登出接口
 * @returns
 */
export function logOut() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
