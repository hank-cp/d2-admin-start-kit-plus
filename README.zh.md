![GitHub package.json version](https://img.shields.io/github/package-json/v/hank-cp/d2-admin-start-kit-plus)
![GitHub last commit](https://img.shields.io/github/last-commit/hank-cp/d2-admin-start-kit-plus)
![GitHub](https://img.shields.io/github/license/hank-cp/d2-admin-start-kit-plus)

[d2-admin-start-kit](https://github.com/d2-projects/d2-admin-start-kit) 的模块化开发版本.
通过分离d2admin的内部代码中业务逻辑相关的部分, 使上手[D2Admin](https://github.com/d2-projects/d2-admin)
更加方便快捷.
 
 [[English](README.md)]
 
![](public/image/directory.png?raw=true)
 
### 代理Delegate
[d2-admin-start-kit-plus](https://github.com/hank-cp/d2-admin-start-kit-plus) 暴露一系列
`delegate`用于整合d2admin.
* [login.js](/src/d2admin/delegate/login.js) 
* [menu.js](/src/d2admin/delegate/menu.js)
* [axios.js](/src/d2admin/delegate/axios.js)

在[启动应用时](/src/main.js), 将这些`delegate`替换为你本地项目的实现

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
    * store (TODO) 
    * routes.js

### 与原版D2Admin的小差别
假设你已经对[D2Admin](https://github.com/d2-projects/d2-admin)比较了解, 以下是
我们对原版D2Admin配置上做出一些改动, 在使用本项目开发前需要了解.
* Mock开关
    * 通过`.env`文件中的`MOCK`参数进行控制.
    * `mock.js`中的`path`属性不再默认转换为正则表达式. 你可以自行选择使用正则表达式或字符串
    来匹配URL.
* Devtool
    * 改为`source-map`, 原版是`cheap-source-map`. 如果开发时遇到遇到性能问题可以尝试修改这里.
* 异步组件
    * 原版[D2Admin](https://github.com/d2-projects/d2-admin) 通过环境变量(development/production)
    来控制是否[异步加载组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6). 
    但我们在进行模块化改造的时候遇到了不可克服的问题, 所以改成:
        * 加载D2Admin组件的时候, 不使用异步方式.
        * 加载module组件的时候, 使用异步方式. 如果开发时遇到遇到性能问题可以尝试改成不使用异步方式.
* `util.db.js`重构, 现在无需通过`Vuex`即可使用localStorage存储工具.
[[PR-211](https://github.com/d2-projects/d2-admin/pull/211)]

### 升级D2Admin
只需更新本工程, 并拷贝覆盖你自己工程的`/src/d2admin`目录.
