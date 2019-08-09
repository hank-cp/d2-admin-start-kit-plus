const userDB = [
  { username: 'dev', password: 'dev', uuid: 'admin-uuid', name: '管理员', status: 0 },
  { username: 'user', password: 'user', uuid: 'editor-uuid', name: '编辑', status: 0 },
  { username: 'user1', password: 'user1', uuid: 'user1-uuid', name: '禁用用户', status: 1 }
]

export default [
  {
    path: '/login',
    method: 'post',
    handle ({ body }) {
      const user = userDB.find(e => e.username === body.username && e.password === body.password)
      if (user) {
        return {
          'access-token': 'access-' + user.username,
          'refresh-token': 'refresh-' + user.username,
          'login-token': user.password,
          'principal': user
        }
      } else {
        return {
          code: 401,
          msg: '用户名或密码错误',
          data: {}
        }
      }
    }
  },
  {
    path: '/login-by-token',
    method: 'post',
    handle ({ body }) {
      const user = userDB.find(e => e.username === body.username && e.password === body.loginToken)
      if (user) {
        return {
          'access-token': 'access-' + user.username,
          'refresh-token': 'refresh-' + user.username,
          'login-token': user.password,
          'principal': user
        }
      } else {
        return {
          code: 401,
          msg: '用户名或密码错误',
          data: {}
        }
      }
    }
  }
]
