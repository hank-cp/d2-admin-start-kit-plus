import axios from '@/d2admin/plugin/axios'
import qs from 'qs'

export default {
  login ({ username, password, loginToken }) {
    return new Promise(async (resolve, reject) => {
      let resp
      if (loginToken) {
        resp = await axios.post(`/login-by-token`,
          qs.stringify({ loginToken })
        ).catch(err => {
          console.log('Login failed: ', err)
          reject(err)
        })
      } else {
        resp = await axios.post(`/login`,
          qs.stringify({
            username, password
          })
        )
      }

      const saveToGlobal = {}
      saveToGlobal[resp.principal.username + '-login-token'] = resp['login-token']
      resolve({
        uuid: resp.principal.username,
        token: resp['access-token'],
        name: resp.principal.nickName || resp.principal.username,
        saveToCookie: {
          'access-token': resp['access-token'],
          'refresh-token': resp['refresh-token']
        },
        saveToPrivate: {
          principal: resp.principal
        },
        saveToGlobal
      })
    })
  }
}
