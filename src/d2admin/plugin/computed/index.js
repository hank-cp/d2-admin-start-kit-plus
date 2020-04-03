// import './vue'

export default {
  install(Vue, options) {
    Object.defineProperty(Vue.prototype, '$computed', {
      get() {
        let computed = {}
        Object.keys(this._computedWatchers).forEach((key) => {
          computed[key] = this._computedWatchers[key].get()
        })
        return computed
      }
    })
  }
}
