import { Module } from 'vuex'

const module: Module<any, any> = {
  namespaced: true,
  state: {
    count: 0
  },
  getters: {
    count(state) {
      return state.count
    }
  },
  mutations: {
    increase(state) {
      state.count += 1
    },
    reset(state) {
      // store 赋值
      state.count = 0
    }
  }
}

export default module
