export default [
  {
    path: process.env.VUE_APP_API + '/demo-api',
    method: 'get',
    handle() {
      return 'Hello world from API mock'
    }
  }
]
