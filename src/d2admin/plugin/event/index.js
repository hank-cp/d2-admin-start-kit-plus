import EventBus from './event-bus'

export default {
  install(Vue, options) {
    // 将每个事件都发送到EventBus
    Vue.prototype.$emitToGlobal = function (event, ...args) {
      EventBus.$emit(event, ...args)
      this.$emit(event, ...args)
    }
  }
}
