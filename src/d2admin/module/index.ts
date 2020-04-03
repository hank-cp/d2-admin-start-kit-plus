import { RouterOptions } from 'vue-router/types/router'
import { Module, ModuleTree } from 'vuex/types'
import { ModuleHook } from '@/d2admin/module/types'
import _ from 'lodash'

function scanModuleConfigs(filename : string): any {
  const moduleConfig: { [moduleName: string]: RouterOptions[] } = {}
  const push = (context: __WebpackModuleApi.RequireContext) => context.keys().map(key => {
    let module = context(key)
    let moduleName
    const matches = key.match(/\.\/(.*?)\//)
    if (matches && matches.length > 1) {
      moduleName = matches[1]
    }
    if (moduleName && module.default) moduleConfig[moduleName] = module.default
  })
  // filter regexp must be literal
  // https://github.com/webpack/webpack/issues/9300
  switch (filename) {
    case 'routes' :
      push(require.context('@/module', true, /routes\.(js|ts)$/))
      break
    case 'store' :
      push(require.context('@/module', true, /store\/index\.(js|ts)$/))
      break
    case 'hook' :
      push(require.context('@/module', true, /hook\.(js|ts)$/))
      break
  }
  return moduleConfig
}

export class ModuleLoader {
  private readonly moduleRoutes: { [moduleName: string]: RouterOptions[] }
  private readonly moduleStores: ModuleTree<any>
  private readonly moduleHooks: { [moduleName: string]: ModuleHook }

  constructor() {
    this.moduleRoutes = scanModuleConfigs('routes')
    this.moduleStores = scanModuleConfigs('store')
    this.moduleHooks = scanModuleConfigs('hook')
  }

  get routes(): RouterOptions[] {
    return _.flatMap(this.moduleRoutes)
  }

  get stores(): ModuleTree<any> {
    return this.moduleStores
  }

  get hooks(): ModuleHook[] {
    return _.flatMap(this.moduleHooks)
  }
}

export default new ModuleLoader()
