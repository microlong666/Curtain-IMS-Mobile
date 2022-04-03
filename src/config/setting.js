/**
 * 框架全局配置
 */
export default {
  // 不显示全局页脚的路由
  hideFooters: ['/system/dictionary', '/system/organization'],
  // 不需要登录的路由
  whiteList: ['/login', '/forget', '/sso'],
  // 菜单数据接口
  menuUrl: '/sysMenu/getLeftMenusAntdv',
  // 自定义解析菜单接口数据
  parseMenu: null,
  // 自定义解析菜单接口单个数据格式
  parseMenuItem: null,
  // 直接指定菜单数据
  menus: null,
  // 用户信息接口
  userUrl: '/getUserInfo',
  // 自定义解析接口用户信息，无需转化，接口已经返回正确格式
  parseUser(res) {
    return res;
  },
  // token传递的header名称
  tokenHeaderName: 'Authorization',
  // token存储的名称
  tokenStoreName: 'access_token',
  // 用户信息存储的名称
  userStoreName: 'user',
  // 首页标题, 为空会自动获取
  homeTitle: '主页',
  // 首页路径, 为空会自动获取
  homePath: null,
  /**
   * 获取缓存的token的方法
   * @returns {string}
   */
  takeToken() {
    let token = localStorage.getItem(this.tokenStoreName);
    if (!token) {
      token = sessionStorage.getItem(this.tokenStoreName);
    }
    return token;
  },
  /**
   * 缓存token的方法
   * @param token
   * @param remember 是否永久存储
   */
  cacheToken(token, remember) {
    localStorage.removeItem(this.tokenStoreName);
    sessionStorage.removeItem(this.tokenStoreName);
    if (token) {
      if (remember) {
        localStorage.setItem(this.tokenStoreName, token);
      } else {
        sessionStorage.setItem(this.tokenStoreName, token);
      }
    }
  },
  /**
   * 获取缓存的用户信息
   * @returns {object}
   */
  takeUser() {
    try {
      return JSON.parse(localStorage.getItem(this.userStoreName)) || {};
    } catch (e) {
      console.error(e);
    }
    return {};
  },
  /**
   * 缓存用户信息
   * @param user
   */
  cacheUser(user) {
    if (user) {
      localStorage.setItem(this.userStoreName, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.userStoreName);
    }
  }
}
