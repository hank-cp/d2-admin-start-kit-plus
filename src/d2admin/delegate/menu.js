/**
 * @description 获取菜单代理
 */
export default {
  /**
   * 获取Menu
   */
  loadMenu ({ commit }) {
    return new Promise((resolve) => {
      const menuHeader = require('../../d2admin/menu/header').default
      const menuAside = require('../../d2admin/menu/aside').default
      // 设置顶栏菜单
      commit('d2admin/menu/headerSet', menuHeader, { root: true })
      // 设置侧边栏菜单
      commit('d2admin/menu/asideSet', menuAside, { root: true })
      // 初始化菜单搜索功能
      commit('d2admin/search/init', menuHeader, { root: true })
      resolve()
    })
  }
}
