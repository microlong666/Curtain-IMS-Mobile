import Layout from '@/layout'

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
    redirect: 'demo',
    children: [
      {
        path: '/demo',
        name: 'Demo',
        component: () => import('@/views/demo'),
        meta: {
          title: '主页'
        }
      },
      {
        path: '/tools',
        name: 'Tools',
        component: () => import('@/views/tools'),
        meta: {
          title: '工具'
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about'),
        meta: {
          title: '关于',
          noCache: true
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
