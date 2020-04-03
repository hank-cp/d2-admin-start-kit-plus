import axios from '@/d2admin/plugin/axios'
import qs from 'qs'
import { LoginDelegateDefault } from '@/d2admin/delegate/login'
import { delegate } from '@/d2admin/delegate'
import LoginResult = delegate.LoginResult;
import LoginParam = delegate.LoginParam;

class LoginDelegateImpl extends LoginDelegateDefault {
  async login(loginParam: LoginParam): Promise<LoginResult> {
    let resp: any
    if (loginParam.loginToken) {
      resp = await axios.post('/login-by-token',
        qs.stringify({ loginToken: loginParam.loginParam })
      ).catch(err => {
        console.log('Login failed: ', err)
        throw err
      })
    } else {
      resp = await axios.post('/login',
        qs.stringify({
          username: loginParam.username,
          password: loginParam.password
        })
      ).catch(err => {
        console.log('Login failed: ', err)
        throw err
      })
    }

    const saveToGlobal: any = {}
    saveToGlobal[resp.principal.username + '-login-token'] = resp['login-token']

    let loginResult: LoginResult = {
      uuid: resp.principal.username,
      name: resp.principal.nickName || resp.principal.username,
      saveToCookie: {
        'access-token': resp['access-token'],
        'refresh-token': resp['refresh-token']
      },
      saveToPrivate: {
        principal: resp.principal
      },
      saveToGlobal
    }
    return loginResult
  }
}

export default new LoginDelegateImpl()
