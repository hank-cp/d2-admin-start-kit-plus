// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App.vue'
// 核心插件
import d2Admin from '@/d2admin/plugin/d2admin'
// store
import store from '@/store'
// 登录代理
import loginDelegate from '@/d2admin/delegate/login'
import loginImpl from '@/module/boot/api/sys.login'
// 菜单和路由设置
import router from './router'
import ModuleLoader from '@/d2admin/module'

// 设置登录代理
loginDelegate.set(loginImpl)

// 核心插件
Vue.use(d2Admin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    ModuleLoader.hooks.forEach(hook => {
      if (hook.onAppStarted) hook.onAppStarted()
    })

    this.$store.commit('d2admin/page/init', ModuleLoader.routes)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
