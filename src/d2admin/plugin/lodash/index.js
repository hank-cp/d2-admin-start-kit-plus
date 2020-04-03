import _ from 'lodash'
import moment from 'moment'

export default {
  install(Vue, options) {
    Vue.prototype.$_ = _
    window._ = _

    Vue.prototype.$moment = moment
  }
}
