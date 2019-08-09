export default [
  {
    path: 'page1',
    name: 'page1',
    meta: {
      title: '页面 1',
      auth: true
    },
    component: () => import('@/module/demo/views/page1')
  },
  {
    path: 'page2',
    name: 'page2',
    meta: {
      title: '页面 2',
      auth: true
    },
    component: () => import('./views/page2')
  },
  {
    path: 'page3',
    name: 'page3',
    meta: {
      title: '页面 3',
      auth: true
    },
    component: () => import('./views/page3')
  }
]
