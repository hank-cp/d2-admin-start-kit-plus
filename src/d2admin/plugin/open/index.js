import util from '@/d2admin/libs/util'

export default {
  install (Vue, options) {
    Vue.prototype.$open = util.open
  }
}
