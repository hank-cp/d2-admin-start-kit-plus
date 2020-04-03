import store from '@/store'
import util from '@/d2admin/libs/util'
import { get } from 'lodash'

export default {
  install(Vue, options) {
    // 快速打印 log
    Vue.prototype.$log = {
      ...util.log,
      push(data, type = 'error') {
        if (typeof data === 'string') {
          // 如果传递来的数据是字符串
          // 赋值给 message 字段
          // 为了方便使用
          // eg: this.$log.push('foo text')
          store.dispatch('d2admin/log/push', {
            message: data,
            type
          })
        } else if (typeof data === 'object') {
          // 如果传递来的数据是对象
          store.dispatch('d2admin/log/push', data)
        }
      }
    }
  }
}
