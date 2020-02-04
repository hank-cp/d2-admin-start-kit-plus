import { ModuleHook } from '@/d2admin/module/types'
import { dbGet } from '@/d2admin/libs/util.db'

export class DemoHook implements ModuleHook {
  onAppStarted = async () => {
    console.log('Module Demo Started')
  }

  onLoggedIn = async () => {
    let user = await dbGet({ path: 'principal', user: true })
    console.log('Module Demo Signed In')
    console.log(user)
    setTimeout(() => {}, 2000)
  }

  onLoggedOut = async () => {
    console.log('Module Demo Signed Out')
  }
}

export default new DemoHook()
