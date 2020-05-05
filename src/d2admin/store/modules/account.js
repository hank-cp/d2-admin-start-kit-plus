import { Message, MessageBox } from 'element-ui'
import util from '@/d2admin/libs/util.js'
import router from '@/router'
import loginDelegate from '@/d2admin/delegate/login'
import _ from 'lodash'

import ModuleLoader from '@/d2admin/module'

export default {
  namespaced: true,
  state: {
    // 登录连接Loading状态
    loading: false,
    // 登录初始化加载中状态
    loadingText: '登录中……'
  },
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} loginParam 登录信息
     */
    login({ state, dispatch, commit }, loginParam) {
      commit('startLoading')
      return loginDelegate.get().login(loginParam).then(({
        uuid = '', name = '',
        saveToCookie = {},
        saveToPrivate = {},
        saveToGlobal = {}
      }) => {
        commit('startLoading', '初始化中……')

        // 开始请求登录接口
        util.cookies.set('uuid', uuid)
        // 保存信息到cookies
        _.forEach(saveToCookie, (value, key) => {
          util.cookies.set(key, value)
        })

        return Promise.all([
          // 设置 vuex 用户信息
          dispatch('d2admin/user/set', { name }, { root: true }),
          // 保存信息到私有存储
          dispatch('d2admin/db/database', { user: true }, { root: true }).then(async (privateDb) => {
            await Promise.all(_.map(saveToPrivate, (value, key) => {
              return privateDb.set(key, value).write()
            }))
          }),
          // 保存信息到公有存储
          dispatch('d2admin/db/database', {}, { root: true }).then(async (globalDb) => {
            await Promise.all(_.map(saveToGlobal, (value, key) => {
              return globalDb.set(key, value).write()
            }))
          })
        ]).then(async () => {
          // module hook回调
          for (const hook of ModuleLoader.hooks.filter(hook => hook.onLoggedIn)) {
            await hook.onLoggedIn()
          }
          // Promise.all([
          //   ...ModuleLoader.hooks.filter(hook => hook.onLoggedIn).map(hook => hook.onLoggedIn())
          // ])
        }).then(() => {
          // 用户登录后从持久化数据加载一系列的设置
          dispatch('load')
        }).finally(() => {
          // 结束loading状态
          commit('stopLoading')
        })
      }).catch((err) => {
        // 结束loading状态
        commit('stopLoading')
        throw err
      })
    },

    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout({ state, commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      function logout() {
        state.logoutLoading = true
        // 删除登录标志
        util.cookies.remove('uuid')
        // 清空 vuex 用户信息
        return Promise.all([
          dispatch('d2admin/user/set', {}, { root: true }),
          loginDelegate.get().logout(),
          ...ModuleLoader.hooks.filter(hook => hook.onLoggedOut).map(hook => hook.onLoggedOut())
        ]).then(() => {
          state.logoutLoading = false

          // 跳转路由
          router.push({
            name: 'login'
          })
        })
      }
      // 判断是否需要确认
      if (confirm) {
        commit('d2admin/gray/set', true, { root: true })
        MessageBox.confirm('确定要注销当前用户吗', '注销用户', {
          type: 'warning'
        }).then(() => {
          commit('d2admin/gray/set', false, { root: true })
          logout()
        }).catch(() => {
          commit('d2admin/gray/set', false, { root: true })
          Message({
            message: '取消注销操作'
          })
        })
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    load({ dispatch }) {
      return Promise.all([
        // DB -> store 加载用户名
        dispatch('d2admin/user/load', null, { root: true }),
        // DB -> store 加载菜单
        dispatch('d2admin/menu/load', null, { root: true }),
        // DB -> store 加载主题
        dispatch('d2admin/theme/load', null, { root: true }),
        // DB -> store 加载页面过渡效果设置
        dispatch('d2admin/transition/load', null, { root: true }),
        // DB -> store 持久化数据加载上次退出时的多页列表
        dispatch('d2admin/page/openedLoad', null, { root: true }),
        // DB -> store 持久化数据加载侧边栏折叠状态
        dispatch('d2admin/menu/asideLoad', null, { root: true }),
        // DB -> store 持久化数据加载全局尺寸
        dispatch('d2admin/size/load', null, { root: true }),
        // DB -> store 持久化数据加载颜色设置
        dispatch('d2admin/color/load', null, { root: true })
      ])
    }
  },
  mutations: {
    /**
     * @description 设置 登录加载状态
     * @param {Object} state state
     * @param {Boolean} text 加载状态文字
     */
    startLoading(state, text) {
      state.loading = true
      if (text) state.loadingText = text
    },
    /**
     * @description 关闭 登录加载状态
     * @param {Object} state state
     */
    stopLoading(state) {
      state.loading = false
    }
  }
}
