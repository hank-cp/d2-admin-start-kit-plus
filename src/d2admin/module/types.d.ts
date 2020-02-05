import { RouterOptions } from 'vue-router'

declare interface ModuleHook {
  onAppStarted?(): Promise<void>

  onLoggedIn?(): Promise<void>

  onLoggedOut?(): Promise<void>
}

declare interface ModuleRoutes {
  [moduleName: string]: RouterOptions
}

declare interface ModuleHooks {
  [moduleName: string]: ModuleHook
}
