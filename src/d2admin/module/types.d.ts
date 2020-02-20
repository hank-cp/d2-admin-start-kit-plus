import { ComponentOptions } from 'vue'

declare interface ModuleHook {
  onModuleLoaded?(vueOption: ComponentOptions<any>): any

  onAppStarted?(): any

  onLoggedIn?(): Promise<any>

  onLoggedOut?(): Promise<any>
}
