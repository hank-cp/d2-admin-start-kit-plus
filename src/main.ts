// Vue
import 'vue-class-component/hooks'
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import App from './App.vue'
import '@/d2admin/missing-types'
// D2admin
import d2Admin from '@/d2admin/plugin/d2admin'
import store from '@/store'
import i18n from './i18n'
// 代理 - 登录
import loginDelegate from '@/d2admin/delegate/login'
import loginImpl from '@/module/boot/api/sys.login'
// 代理 - Axios
// 代理 - menu
// 路由设置
import router from './router'
import ModuleLoader from '@/d2admin/module'

//* **************************************************************************
// D2Admin
//* **************************************************************************
Vue.use(d2Admin)

loginDelegate.set(loginImpl)
// axiosDelegate.set(axiosImpl)
// menuDelegate.set(menuImpl)

//* **************************************************************************
// vueOptions
//* **************************************************************************

const vueOptions: ThisTypedComponentOptionsWithRecordProps<Vue, any, any, any, any> = {
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // ModuleHook启动回调
    ModuleLoader.hooks.forEach(hook => {
      if (hook.onAppStarted) hook.onAppStarted()
    })

    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', ModuleLoader.routes)
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}

// ModuleHook加载回调
ModuleLoader.hooks.forEach(hook => {
  if (hook.onModuleLoaded) hook.onModuleLoaded(vueOptions)
})

export default new Vue(vueOptions).$mount('#app')
