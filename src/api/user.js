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
 * 用户信息
 * @returns
 */
export function getUserInfo() {
  return request({
    url: '/rest/system/currentUserInfo',
    method: 'get'
  })
}

/**
 * 用户信息
 * @returns
 */
export function getUserDetail() {
  return request({
    url: '/system/currentUserInfo',
    method: 'get'
  })
}

/**
 * 修改密码
 * @returns
 */
export function changePwd(data) {
  return request({
    url: '/mgr/changePwd',
    method: 'post',
    data
  })
}

/**
 * 上传头像
 * @returns
 */
export function uploadAvatar(data) {
  return request({
    url: '/system/upload',
    method: 'post',
    data
  })
}

/**
 * 更新头像
 * @returns
 */
export function updateAvatar(data) {
  return request({
    url: '/system/updateAvatar',
    method: 'post',
    data
  })
}

/**
 * 修改用户信息
 * @returns
 */
export function editUserInfo(data) {
  return request({
    url: '/mgr/edit',
    method: 'post',
    data
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
