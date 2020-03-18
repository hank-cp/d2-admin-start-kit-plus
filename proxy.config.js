module.exports = {
  '/api/md/graphql': {
    target: 'http://127.0.0.1:8003',
    ws: true,
    changeOrigin: true,
    pathRewrite: {
      '^/api/md/graphql': '/graphql'
    }
  },
  '/api': {
    target: 'http://127.0.0.1:8001',
    ws: true,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}
