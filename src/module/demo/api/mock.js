export default [
  {
    path: /\/demo-api$/,
    method: 'get',
    handle() {
      return 'Hello world from API mock'
    }
  }
]
