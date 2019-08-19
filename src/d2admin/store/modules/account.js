import { Message, MessageBox } from 'element-ui'
import util from '@/d2admin/libs/util.js'
import router from '@/router'
import loginDelegate from '@/d2admin/delegate/login'
import _ from 'lodash'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} loginParam 登录信息
     */
    login ({ dispatch }, loginParam) {
      let loginPromise = loginDelegate.login(loginParam)
      loginPromise.then(async ({
        uuid = '', name = '',
        saveToCookie = {},
        saveToPrivate = {},
        saveToGlobal = {}
      }) => {
        // 开始请求登录接口
        util.cookies.set('uuid', uuid)
        // 保存信息到cookies
        _.forEach(saveToCookie, (value, key) => {
          util.cookies.set(key, value)
        })

        // 设置 vuex 用户信息
        await dispatch('d2admin/user/set', { name }, { root: true })

        // 保存信息到私有存储
        const privateDb = await dispatch('d2admin/db/database', {
          user: true
        }, { root: true })
        _.forEach(saveToPrivate, (value, key) => {
          privateDb.set(key, value).write()
        })

        // 保存信息到公有存储
        const globalDb = await dispatch('d2admin/db/database', {}, { root: true })
        _.forEach(saveToGlobal, (value, key) => {
          globalDb.set(key, value).write()
        })
      }).then(async () =>
        // 用户登录后从持久化数据加载一系列的设置
        dispatch('load')
      )
      return loginPromise
    },

    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout ({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      async function logout () {
        // 删除登录标志
        util.cookies.remove('uuid')
        // 清空 vuex 用户信息
        await dispatch('d2admin/user/set', {}, { root: true })
        await loginDelegate.logout()
        // 跳转路由
        router.push({
          name: 'login'
        })
      }
      // 判断是否需要确认
      if (confirm) {
        commit('d2admin/gray/set', true, { root: true })
        MessageBox.confirm('注销当前账户吗?  打开的标签页和用户设置将会被保存。', '确认操作', {
          confirmButtonText: '确定注销',
          cancelButtonText: '放弃',
          type: 'warning'
        })
          .then(() => {
            commit('d2admin/gray/set', false, { root: true })
            logout()
          })
          .catch(() => {
            commit('d2admin/gray/set', false, { root: true })
            Message({
              message: '放弃注销用户'
            })
          })
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load ({ dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('d2admin/user/load', null, { root: true })
        // DB -> store 加载菜单
        await dispatch('d2admin/menu/load', null, { root: true })
        // DB -> store 加载主题
        await dispatch('d2admin/theme/load', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        await dispatch('d2admin/transition/load', null, { root: true })
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('d2admin/page/openedLoad', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true })
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('d2admin/size/load', null, { root: true })
        // end
        resolve()
      })
    }
  }
}
