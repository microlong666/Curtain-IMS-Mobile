import axios from 'axios'
import store from '../store'
import router from '../router'
import setting from '../config/setting'
import qs from 'qs'
import { Toast, Dialog } from 'vant'

// 创建实例
const service = axios.create({
  baseURL: '/api'
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = setting.takeToken()
    if (token) {
      config.headers[setting.tokenHeaderName] = token
      // 如果是get请求，就把参数拼接到url上
      if (config.method === 'get') {
        config.paramsSerializer = function (params) {
          return qs.stringify(params, { arrayFormat: 'indices' })
        }
      }
    }
    return config
  },
  error => {
    // 请求错误，可在此进行统一错误处理
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response

    if (res.data.code === 200) {
      const access_token = res.headers[setting.tokenHeaderName]
      if (access_token) {
        setting.cacheToken(access_token)
      }
      return res
    } else {
      Toast.fail({
        message: res.data.message || 'Error',
        duration: 5 * 1000
      })
      // return Promise.reject(new Error(res.message || 'Error'))
      return processErrorResponse(res)
    }
  },
  error => {
    console.log('err' + error) // for debug
    // 处理响应错误
    return processErrorResponse(error.response);
  }
)

/**
 * 跳转到登录页面
 *
 * @author fengshuonan
 * @date 2021/4/2 15:33
 */
function goLogin(reload) {
  store.dispatch('user/removeToken').then(() => {
    if (reload) {
      location.replace('/login') // 这样跳转避免再次登录重复注册动态路由
    } else {
      const path = router.currentRoute.path
      return router.push({
        path: '/login',
        query: path && path !== '/' ? { form: path } : null
      })
    }
  })
}

/**
 * 处理错误的响应
 *
 * @author fengshuonan
 * @date 2021/4/2 15:33
 */
function processErrorResponse(response) {
  // 判断登录是否过期
  if (response.data.code != '1502') {
    // Toast.fail({
    //   message: response.data.message
    // })
  } else {
    Dialog.alert({
      title: '系统提示',
      message: '登录状态已过期, 请退出重新登录!',
      confirmButtonText: '重新登录'
    }).then(() => goLogin(true))
  }
  return Promise.reject(response.data)
}

export default service
