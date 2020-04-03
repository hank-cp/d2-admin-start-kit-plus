/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('./', true, /^((?!index).)*\.(ts|js)$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/\.\/(.*)\.(js|ts)/, '$1')] = files(key).default
})

export default {
  namespaced: true,
  modules
}
