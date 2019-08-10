This project is a folk version of [d2-admin-start-kit](https://github.com/d2-projects/d2-admin-start-kit).
It separates d2 admin internal stuffs and business logic clearly to
help you start [D2Admin](https://github.com/d2-projects/d2-admin) project quickly and easily.
 
 [中文](README.zh.md)
 
### Delegate
[d2-admin-start-kit-plus](https://github.com/hank-cp/d2-admin-start-kit-plus) expose
`delegate` to integrate your own implementation.
* [login.js](/src/d2admin/delegate/login.js) 
* [menu.js](/src/d2admin/delegate/menu.js)

Replace these delegates default implementation [on start up](/src/main.js) with
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
    * store (TODO) 
    * routes.js
    
### Differences from original D2Admin
We assume you are familiar with [D2Admin](https://github.com/d2-projects/d2-admin), 
and we make a little bit changes from original D2Admin configuration. Please be aware
before start to use this project.
* Mock switch
    * it's now control by `MOCK` in `.env` file.
* Devtool
    * it's now `source-map`, original it's `cheap-source-map`. If you run into
    performance issue, consider modify it.
* Async Component
    * Originally [D2Admin](https://github.com/d2-projects/d2-admin) switch
    [sync/async Vue component](https://vuejs.org/v2/guide/components-dynamic-async.html) 
    loading by env (development/production). But we
    have difficulty to handle this in module way with webpack. So we change it to:
        * Load D2Admin components in sync way.
        * Load module components in async way. If you get performance issue,
        consider change it to sync way.
    
### Upgrade D2Admin
Pull this project with updates then just copy and replace `/src/d2admin` directory 
of your own project should be just fine. 

### TODO
* Support Vuex module register dynamically.
* Load module dynamically.
* Permission check for vue component.
* npm package for D2Admin.
