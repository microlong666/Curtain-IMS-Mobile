import Layout from '@/layout'
import DetailLayout from '@/layout/detail.vue'
import TabLayout from '@/layout/items.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: {
          title: '主页'
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about'),
        meta: {
          title: '我的'
        }
      }
    ]
  },
  {
    path: '/',
    name: 'detail',
    component: DetailLayout,
    children: [
      {
        path: '/about/info',
        name: 'UserInfo',
        component: () => import('@/views/about/info.vue'),
        meta: {
          title: '个人资料'
        }
      },
      {
        path: '/about/pwd',
        name: 'ChangePwd',
        component: () => import('@/views/about/pwd.vue'),
        meta: {
          title: '修改密码',
          noCache: true
        }
      },
      {
        path: '/need/:status?',
        name: 'Need',
        component: () => import('@/views/need'),
        meta: {
          title: '需求登记'
        }
      },
      {
        path: '/order/:status?',
        name: 'Order',
        component: () => import('@/views/order'),
        meta: {
          title: '订单管理'
        }
      },
      {
        path: '/order/detail/:id',
        name: 'OrderDetail',
        component: () => import('@/views/order/detail.vue'),
        meta: {
          title: '订单详细',
          noCache: true
        }
      },
      {
        path: '/order/version/:id',
        name: 'OrderVesion',
        component: () => import('@/views/order/version.vue'),
        meta: {
          title: '订单记录',
          noCache: true
        }
      },
      {
        path: '/customer',
        name: 'Customer',
        component: () => import('@/views/customer'),
        meta: {
          title: '客户管理',
          roles: ['超级管理员', '系统管理员']
        }
      },
      {
        path: '/supplier',
        name: 'Supplier',
        component: () => import('@/views/supplier'),
        meta: {
          title: '供应商管理',
          roles: ['超级管理员', '系统管理员']
        }
      },
      {
        path: '/curtain/:id',
        name: 'CurtainDetail',
        component: () => import('@/views/items/curtain/detail.vue'),
        meta: {
          title: '成品帘详情',
          roles: ['超级管理员', '系统管理员'],
          noCache: true
        }
      },
      {
        path: '/mainFabric/:id',
        name: 'MainFabricDetail',
        component: () => import('@/views/items/mainFabric/detail.vue'),
        meta: {
          title: '主布详情',
          roles: ['超级管理员', '系统管理员'],
          noCache: true
        }
      },
      {
        path: '/insideFabric/:id',
        name: 'InsideFabricDetail',
        component: () => import('@/views/items/insideFabric/detail.vue'),
        meta: {
          title: '里布详情',
          roles: ['超级管理员', '系统管理员'],
          noCache: true
        }
      },
      {
        path: '/sheerCurtain/:id',
        name: 'SheerCurtainDetail',
        component: () => import('@/views/items/sheerCurtain/detail.vue'),
        meta: {
          title: '窗纱详情',
          roles: ['超级管理员', '系统管理员'],
          noCache: true
        }
      },
      {
        path: '/track/:id',
        name: 'TrackDetail',
        component: () => import('@/views/items/track/detail.vue'),
        meta: {
          title: '导轨详情',
          roles: ['超级管理员', '系统管理员'],
          noCache: true
        }
      },
      {
        path: '/accessory/:id',
        name: 'AccessoryDetail',
        component: () => import('@/views/items/accessory/detail.vue'),
        meta: {
          title: '配件详情',
          roles: ['超级管理员', '系统管理员'],
          noCache: true
        }
      },
      {
        path: '/adjuvant/:id',
        name: 'AdjuvantDetail',
        component: () => import('@/views/items/adjuvant/detail.vue'),
        meta: {
          title: '辅料详情',
          roles: ['超级管理员', '系统管理员'],
          noCache: true
        }
      }
    ]
  },
  {
    path: '/items',
    name: 'Items',
    component: TabLayout,
    redirect: '/curtain',
    children: [
      {
        path: '/curtain',
        name: 'Curtain',
        component: () => import('@/views/items/curtain'),
        meta: {
          title: '成品帘管理',
          roles: ['超级管理员', '系统管理员']
        }
      },
      {
        path: '/mainFabric',
        name: 'MainFabric',
        component: () => import('@/views/items/mainFabric'),
        meta: {
          title: '主布管理',
          roles: ['超级管理员', '系统管理员']
        }
      },
      {
        path: '/insideFabric',
        name: 'InsideFabric',
        component: () => import('@/views/items/insideFabric'),
        meta: {
          title: '里布管理',
          roles: ['超级管理员', '系统管理员']
        }
      },
      {
        path: '/sheerCurtain',
        name: 'SheerCurtain',
        component: () => import('@/views/items/sheerCurtain'),
        meta: {
          title: '窗纱管理',
          roles: ['超级管理员', '系统管理员']
        }
      },
      {
        path: '/track',
        name: 'Track',
        component: () => import('@/views/items/track'),
        meta: {
          title: '导轨管理',
          roles: ['超级管理员', '系统管理员']
        }
      },
      {
        path: '/accessory',
        name: 'Accessory',
        component: () => import('@/views/items/accessory'),
        meta: {
          title: '配件管理',
          roles: ['超级管理员', '系统管理员']
        }
      },
      {
        path: '/adjuvant',
        name: 'Adjuvant',
        component: () => import('@/views/items/adjuvant'),
        meta: {
          title: '辅料管理',
          roles: ['超级管理员', '系统管理员']
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Exception404',
    component: () => import('@/views/exception'),
    meta: {
      title: '404'
    }
  }
]

export default routes
