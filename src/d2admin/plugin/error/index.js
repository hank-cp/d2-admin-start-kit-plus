import store from '@/store'
import util from '@/d2admin/libs/util'

export default {
  install (Vue, options) {
    function writeLog (logType) {
      return (error, instance, info) => {
        Vue.nextTick(() => {
          // store 追加 log
          store.dispatch('d2admin/log/push', {
            message: `${info}: ${error.message}`,
            type: logType,
            meta: {
              error,
              instance
            }
          })
          // 只在开发模式下打印 log
          if (process.env.NODE_ENV === 'development') {
            util.log.capsule('D2Admin', 'ErrorHandler', 'danger')
            util.log.danger('>>>>>> 错误信息 >>>>>>')
            console.log(info)
            util.log.danger('>>>>>> Vue 实例 >>>>>>')
            console.log(instance)
            util.log.danger('>>>>>> Error >>>>>>')
            console.log(error)
          }
        })
      }
    }
    if (process.env.NODE_ENV === 'development') {
      Vue.config.warnHandler = writeLog('warning')
    }
    Vue.config.errorHandler = writeLog('danger')
  }
}
