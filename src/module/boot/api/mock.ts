import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'

const userDB = [
  { username: 'dev', password: 'dev', uuid: 'admin-uuid', name: '管理员', status: 0 },
  { username: 'user', password: 'user', uuid: 'editor-uuid', name: '编辑', status: 0 },
  { username: 'admin', password: 'admin', uuid: 'user1-uuid', name: '禁用用户', status: 1 }
]

export default function (mock: MockAdapter) {
  mock.onPost('/login').reply(config => {
    const params = qs.parse(config.data)
    const user = userDB.find(e => e.username === params.username && e.password === params.password)
    if (user) {
      return [200, {
        'access-token': 'access-' + user.username,
        'refresh-token': 'refresh-' + user.username,
        'login-token': user.password,
        principal: user
      }]
    } else {
      return [401, {
        msg: '用户名或密码错误'
      }]
    }
  })

  mock.onPost('/login-by-token').reply(config => {
    const params = qs.parse(config.data)
    const user = userDB.find(e => e.username === params.username && e.password === params.loginToken)
    if (user) {
      return [200, {
        'access-token': 'access-' + user.username,
        'refresh-token': 'refresh-' + user.username,
        'login-token': user.password,
        principal: user
      }]
    } else {
      return [401, {
        msg: '用户名或密码错误'
      }]
    }
  })

  return mock
}
