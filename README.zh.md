[d2-admin-start-kit](https://github.com/d2-projects/d2-admin-start-kit) 的模块化开发版本.
通过分离d2admin的内部代码中业务逻辑相关的部分, 使上手[D2Admin](https://github.com/d2-projects/d2-admin)
更加方便快捷.
 
 [English](README.md)
 
### 代理Delegate
[d2-admin-start-kit-module](https://github.com/hank-cp/d2-admin-start-kit-module) 暴露一系列
`delegate`用于整合d2admin.
* [login.js](/src/d2admin/delegate/login.js) 
* [menu.js](/src/d2admin/delegate/menu.js)

在[启动应用时](/src/main.js), 将这些`delegate`替换为你本地项目的实现

### 模块Module
一般来说我们开发实际项目的时候都是按模块划分的.
[d2-admin-start-kit-module](https://github.com/hank-cp/d2-admin-start-kit-module)
约定了以下目录结构来组织我们的代码: 
* [module name]
    * api
        * mock.js
    * views
        * [page].vue
        * [assets/image.jpg]
    * store (TODO) 
    * routes.js

### 升级D2Admin
只需更新本工程, 并拷贝覆盖你自己工程的`/src/d2admin`目录.
