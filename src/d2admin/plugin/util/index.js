import _ from 'lodash'
import moment from 'moment'
import util from '@/d2admin/libs/util'

export default {
  install(Vue, options) {
    Vue.prototype.$_ = _
    window._ = _

    Vue.prototype.$moment = moment
    Vue.prototype.$util = util
  }
}
