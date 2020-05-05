import { uniqueId } from 'lodash'

// 创建 el-menu-item
export function elMenuItem(h, menu) {
  return h('el-menu-item', { key: menu.path, props: { index: menu.path } }, [
    ...menu.icon ? [
      h('i', { attrs: { class: `fa fa-${menu.icon}` } })
    ] : [],
    ...menu.icon === undefined & !menu.iconSvg ? [
      h('i', { attrs: { class: 'fa fa-file-o' } })
    ] : [],
    ...menu.iconSvg ? [
      h('d2-icon-svg', { props: { name: menu.iconSvg } })
    ] : [],
    h('span', { slot: 'title' }, menu.title || '未命名菜单')
  ])
}

// 创建 el-submenu
export function elSubmenu(h, menu) {
  return h('el-submenu', { key: menu.path, props: { index: menu.path } }, [
    ...menu.icon ? [
      h('i', { slot: 'title', attrs: { class: `fa fa-${menu.icon}` } })
    ] : [],
    ...menu.icon === undefined & !menu.iconSvg ? [
      h('i', { slot: 'title', attrs: { class: 'fa fa-folder-o' } })
    ] : [],
    ...menu.iconSvg ? [
      h('d2-icon-svg', { slot: 'title', props: { name: menu.iconSvg } })
    ] : [],
    h('span', { slot: 'title' }, menu.title || '未命名菜单'),
    ...menu.children.map((child, childIndex) => (child.children === undefined ? elMenuItem : elSubmenu).call(this, h, child))
  ])
}

/**
 * 给菜单数据补充上 path 字段
 * https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
export function supplementPath(menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}
