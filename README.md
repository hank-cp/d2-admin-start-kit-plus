This project is a folk version of [d2-admin-start-kit](https://github.com/d2-projects/d2-admin-start-kit).
It separates d2 admin internal stuffs and business logic clearly to
help you start [D2Admin](https://github.com/d2-projects/d2-admin) project quickly and easily.
 
 [中文](README.zh.md)
 
### Delegate
[d2-admin-start-kit-module](https://github.com/hank-cp/d2-admin-start-kit-module) expose
`delegate` to integrate your own implementation.
* [login.js](/src/d2admin/delegate/login.js) 
* [menu.js](/src/d2admin/delegate/menu.js)

Replace these delegates default implementation [on start up](/src/main.js) with
your own.

### Module
Generally we design software architecture in modular way for real project.
[d2-admin-start-kit-module](https://github.com/hank-cp/d2-admin-start-kit-module)
defines following directory structure in convention to organize codes.
* [module name]
    * api
        * mock.js
    * views
        * [page].vue
        * [assets/image.jpg]
    * store (TODO) 
    * routes.js 
    
### Upgrade D2Admin
Pull this project with updates then just copy and replace `/src/d2admin` directory 
of your own project should be just fine. 

### TODO
* Support Vuex module register dynamically.
* Load module dynamically.
* Permission check model.
* npm package for D2Admin.
