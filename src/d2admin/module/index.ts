import { RouterOptions } from 'vue-router/types/router'
import { ModuleHook } from '@/d2admin/module/types'
import _ from 'lodash'

function scanModuleConfigs (filename : string): any {
  const moduleConfig: { [moduleName: string]: RouterOptions[] } = {}
  const push = (context: __WebpackModuleApi.RequireContext) => context.keys().map(key => {
    let module = context(key)
    if (module.default) moduleConfig[key] = module.default
  })
  // filter regexp must be literal
  // https://github.com/webpack/webpack/issues/9300
  switch (filename) {
    case 'routes' :
      push(require.context('@/module', true, /routes\.(js|ts)$/))
      break
    case 'hook' :
      push(require.context('@/module', true, /hook\.(js|ts)$/))
      break
  }
  return moduleConfig
}

export class ModuleLoader {
  private readonly moduleRoutes: { [moduleName: string]: RouterOptions[] }
  private readonly moduleHooks: { [moduleName: string]: ModuleHook }

  constructor () {
    this.moduleRoutes = scanModuleConfigs('routes')
    this.moduleHooks = scanModuleConfigs('hook')
  }

  get routes (): RouterOptions[] {
    return _.flatMap(this.moduleRoutes)
  }

  get hooks (): ModuleHook[] {
    return _.flatMap(this.moduleHooks)
  }
}

export default new ModuleLoader()
