import { Store } from 'vuex'
import { delegate } from '@/d2admin/delegate/index'
import { supplementPath } from '@/d2admin/layout/header-aside/components/libs/util.menu'
import MenuDelegate = delegate.MenuDelegate
import MenuItem = delegate.MenuItem

/**
 * @description 获取菜单代理
 */
export class MenuDelegateDefault implements MenuDelegate {
  /**
   * 获取Menu
   */
  loadMenu(store: Store<any>): Promise<void> {
    return new Promise((resolve) => {
      const menuHeader: MenuItem = supplementPath(require('../../d2admin/menu/header').default)
      const menuAside: MenuItem = supplementPath(require('../../d2admin/menu/aside').default)
      // 设置顶栏菜单
      store.commit('d2admin/menu/headerSet', menuHeader, { root: true })
      // 设置侧边栏菜单
      store.commit('d2admin/menu/asideSet', menuAside, { root: true })
      // 初始化菜单搜索功能
      store.commit('d2admin/search/init', menuHeader, { root: true })
      resolve()
    })
  }
}

let INSTANCE = new MenuDelegateDefault()
export default {
  get() {
    return INSTANCE
  },
  set(delegate: MenuDelegateDefault) {
    INSTANCE = delegate
  }
}
