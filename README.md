![GitHub package.json version](https://img.shields.io/github/package-json/v/hank-cp/d2-admin-start-kit-plus)
![GitHub last commit](https://img.shields.io/github/last-commit/hank-cp/d2-admin-start-kit-plus)
![GitHub](https://img.shields.io/github/license/hank-cp/d2-admin-start-kit-plus)

This project is a folk version of [d2-admin-start-kit](https://github.com/d2-projects/d2-admin-start-kit).
It separates d2 admin internal stuffs and business logic clearly to
help you start [D2Admin](https://github.com/d2-projects/d2-admin) project quickly and easily.
 
 [[中文](README.zh.md)]
 
![](directory.png?raw=true)

### Delegate
[d2-admin-start-kit-plus](https://github.com/hank-cp/d2-admin-start-kit-plus) expose
`delegate` to integrate with your own implementation.
* [login.js](/src/d2admin/delegate/login.js) 
* [menu.js](/src/d2admin/delegate/menu.js)
* [axios.js](/src/d2admin/delegate/axios.js) 

Replace these delegates default implementation [on start up](/src/main.ts) with
your own.

### Module
Generally we design software architecture in modular way for real project.
[d2-admin-start-kit-plus](https://github.com/hank-cp/d2-admin-start-kit-plus)
defines following directory structure in convention to organize codes.
* [your module]
    * api
        * [your api].js
        * mock.js
    * views
        * [your page].vue
        * [assets/image.jpg]
    * store
        * [your store].js/ts
        * index.ts (copy from sample and don't modify it)
    * routes.js

### ModuleHook
[ModuleHook](/src/d2admin/module/types.d.ts) provides global application lifecycle
hook for each module.
    
### Differences from original D2Admin
We assume you are familiar with [D2Admin](https://github.com/d2-projects/d2-admin), 
and we make a little bit changes from original D2Admin configuration. Please be aware
before start to use this project.
* **Support Typescript**
    * Means while, it's allow you to keep using Javascript.
    * We recommend to use [vue-class-component](https://github.com/vuejs/vue-class-component)
      and [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
      to organize your vue code.
* Build switch in `.env`
    * `ENABLE_MOCK` decides to use http request mocking or not .
        * Note that `mockjs` is replaced by `axios-mock-adapter`.
    * `ENABLE_LOCAL_PROXY` decides local proxy to be enabled or not.
        * You will need to set up [proxy.config.js](./proxy.config.js) accordingly.
    * `ENABLE_CDN` decides that dependencies will be loaded from cdn rather than built bundle. 
* Devtool
    * it's now `source-map`, original it's `cheap-source-map`. If you run into
    performance issue, consider modify it.
* Async Vue Component
    * Originally [D2Admin](https://github.com/d2-projects/d2-admin) switch
    [sync/async Vue component](https://vuejs.org/v2/guide/components-dynamic-async.html) 
    loading by env (development/production). But we
    have difficulty to handle this in module way with webpack. So we change it to:
        * Load D2Admin components in sync way.
        * Load module components in async way. If you get performance issue,
        consider change it to sync way.  
* Add a global `EventBus`, usage:
  ```
    this.$emitToGlobal('change', event.target.value)
  ```
  ```
    created () {
      EventBus.$on('update:msgSync', msgSync => {
        this.eventBusMsg = msgSync
      }).$on('change', modelVal => {
        this.eventBusMsg = modelVal
      })
    },
  ```
* Integrate with [vue-cli-plugin-ssh](https://github.com/hank-cp/vue-cli-plugin-ssh)
    * Usage: place a file named `upload.config.js` under project root dir
    ```
        module.exports = {
          host: 'your host',
          port: '22',
          username: 'username',
          password: 'password',
          // privateKey: require('fs').readFileSync('~/.ssh/id_rsa'),
          localPath: 'dist',
          remotePath: 'remote dir path'
        }
    ``` 
    * see the plugin document for more details
* Setup e2e test by [cypress](https://www.cypress.io/)
  ```
  npm run test:e2e
  ```
    
### Upgrade D2Admin
Pull this project with updates then just copy and replace `/src/d2admin` directory 
of your own project should be just fine. Some time you will also have to update configuration
files under root folder. Anyway, keep your `src/module` folder always excluded during sync, which
is the place of all your treasures.

### TODO
* Support Vuex module register dynamically.
* Load module dynamically.
* Permission check for vue component.
* npm package for D2Admin.
