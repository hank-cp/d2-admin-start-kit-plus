import _ from 'lodash'

export default {
  install (Vue, options) {
    Vue.prototype.$_ = _
    window._ = _
  }
}
