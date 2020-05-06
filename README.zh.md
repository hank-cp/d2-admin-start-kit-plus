![GitHub package.json version](https://img.shields.io/github/package-json/v/hank-cp/d2-admin-start-kit-plus)
![GitHub last commit](https://img.shields.io/github/last-commit/hank-cp/d2-admin-start-kit-plus)
![GitHub](https://img.shields.io/github/license/hank-cp/d2-admin-start-kit-plus)

[d2-admin-start-kit](https://github.com/d2-projects/d2-admin-start-kit) 的模块化开发版本.
通过分离d2admin的内部代码中业务逻辑相关的部分, 使上手[D2Admin](https://github.com/d2-projects/d2-admin)
更加方便快捷.
 
 [[English](README.md)]
 
![](directory.png?raw=true)
 
### 代理Delegate
[d2-admin-start-kit-plus](https://github.com/hank-cp/d2-admin-start-kit-plus) 暴露一系列
`delegate`用于整合d2admin.
* [login.js](/src/d2admin/delegate/login.js) 
* [menu.js](/src/d2admin/delegate/menu.js)
* [axios.js](/src/d2admin/delegate/axios.js)

在[启动应用时](/src/main.ts), 将这些`delegate`替换为你本地项目的实现

### 模块Module
一般来说我们开发实际项目的时候都是按模块划分的.
[d2-admin-start-kit-plus](https://github.com/hank-cp/d2-admin-start-kit-plus)
约定了以下目录结构来组织我们的代码: 
* [your module]
    * api
        * [your api].js
        * mock.js
    * views
        * [your page].vue
        * [assets/image.jpg]
    * store
        * [your store].js/ts
        * index.ts (从示例复制过去并且不要修改它)
    * routes.js
    * hook.js
    
### ModuleHook
每个功能模块可通过[ModuleHook](/src/d2admin/module/types.d.ts)在整个应用生命周期中挂勾子

### 与原版D2Admin的差别
假设您已经对[D2Admin](https://github.com/d2-projects/d2-admin)比较了解, 以下是
我们对原版D2Admin配置上做出一些改动, 在使用本项目开发前需要了解.
* **支持Typescript**. 同时您可以继续使用Javascript.
    * 我们推荐使用 [vue-class-component](https://github.com/vuejs/vue-class-component)
      和 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
      来编写组织您的vue代码. 
* `.env`文件中的构建开关
    * `ENABLE_MOCK` 是否启用mock
        * 原版的`mockjs`已被替换为`axios-mock-adapter`.
    * `ENABLE_LOCAL_PROXY` 是否使用本地代理服务
        * 需要自己配置[proxy.config.js](./proxy.config.js).
    * `ENABLE_CDN` 是否通过CDN加载外部依赖(有效减小包size)
* Devtool
    * 改为`source-map`, 原版是`cheap-source-map`. 如果开发时遇到遇到性能问题可以尝试修改这里.
* Vue异步组件
    * 原版[D2Admin](https://github.com/d2-projects/d2-admin) 通过环境变量(development/production)
    来控制是否[异步加载组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6). 
    但我们在进行模块化改造的时候遇到了不可克服的问题, 所以改成:
        * 加载D2Admin组件的时候, 不使用异步方式.
        * 加载module组件的时候, 使用异步方式. 如果开发时遇到遇到性能问题可以尝试改成不使用异步方式.
* 增加全局事件总线`EventBus`, 用法:
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
* 集成上传插件[vue-cli-plugin-ssh](https://github.com/hank-cp/vue-cli-plugin-ssh)
    * 用法: 在项目根目录下放一个名为`upload.config.js`的文件, 包含以下内容:
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
    * 更多用法请查看该插件文档
* 集成测试环境 by [cypress](https://www.cypress.io/)
    ```
    npm run test:e2e
    ```

### 升级D2Admin
通常情况下, 只需更新本工程, 并拷贝覆盖您自己工程的`/src/d2admin`目录即可. 有时大版本更新可能也会修改
根目录下的一些配置文件, 您可以使用文件比较工具来同步文件. 总之, `src/module`会始终保持与D2Admin的框架文件
隔离, 在同步文件时切记将其排除在外.
