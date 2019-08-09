import layoutHeaderAside from '@/d2admin/layout/header-aside'
import _ from 'lodash'

function loadModuleRoutes (routes) {
  const req = context => context.keys().map(context)
  return _.flatten(req(require.context('@/module', true, /routes\.js$/))
    .filter(e => e.default)
    .map(e => e.default))
    .forEach(e => routes.push(e))
}

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: require('@d2views/index').default
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: require('@d2views/log').default
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: require('@d2views/function/refresh').default
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: require('@d2views/function/redirect').default
      }
    ]
  }
]
loadModuleRoutes(frameIn[0].children)

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: require('@d2views/login').default
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: require('@d2views/error/404').default
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
