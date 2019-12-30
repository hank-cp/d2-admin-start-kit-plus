const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      '@d2views': resolve('src/d2admin/views/system')
    }
  }
}
