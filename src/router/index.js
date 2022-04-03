import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes'
import store from '@/store'
import setting from '@/config/setting'
import setPageTitle from '@/utils/set-page-title.js'

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  // 路由缓存
  store.commit('cachedView/ADD_CACHED_VIEW', to)
  // 设置页面 title
  setPageTitle(to.meta.title)

  // 判断是否登录 或者跳转的路径在白名单
  if (setting.takeToken() || setting.whiteList.includes(to.path)) {
    // 直接放过跳转到path
    next()
  } else {
    // 其他情况（没有登录，也没再白名单地址）
    // 未登录跳转登录页面
    next({ path: '/login', query: to.path === '/' ? {} : { from: to.path } })
  }
})

export default router
