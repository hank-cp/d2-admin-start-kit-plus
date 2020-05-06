import Vue from 'vue'
import Vuex, { Module, ModuleTree } from 'vuex'
import _ from 'lodash'

import d2admin from './d2admin/store'
import ModuleLoader from '@/d2admin/module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: _.extend(ModuleLoader.stores, {
    d2admin: d2admin as ModuleTree<any>
  })
})
