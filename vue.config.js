function checkEnvEnabled(envName) {
  return process.env[envName] && envName !== 'false'
}

const CompressionWebpackPlugin = require('compression-webpack-plugin')

const VueFilenameInjector = require('@d2-projects/vue-filename-injector')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning')

const cdnDependencies = checkEnvEnabled('ENABLE_CDN') ? require('./dependencies-cdn') : {}
const proxyConfig = checkEnvEnabled('ENABLE_LOCAL_PROXY') ? require('./proxy.config') : {}
let uploadConfig
try {
  uploadConfig = require('./upload.config')
} catch (e) {
  console.log('WARN: uploading is not configured.')
}

const { chain, set, each, keys } = require('lodash')

class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/

    function doneHook(stats) {
      stats.compilation.warnings = stats.compilation.warnings.filter(function (warn) {
        return !(warn instanceof ModuleDependencyWarning && messageRegExp.test(warn.message))
      })
    }

    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook)
    } else {
      compiler.plugin('done', doneHook)
    }
  }
}

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// 基础路径 注意发布之前要先修改这里
let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'

// 设置不参与构建的库
let externals = {}
cdnDependencies.forEach(p => { externals[p.name] = p.library })

// 引入文件的 cdn 链接
const cdn = {
  css: cdnDependencies.map(e => e.css).filter(e => e),
  js: cdnDependencies.map(e => e.js).filter(e => e)
}

// 多页配置，默认未开启，如需要请参考 https://cli.vuejs.org/zh/config/#pages
const pages = undefined
// const pages = {
//   index: './src/main.js',
//   subpage: './src/subpage.js'
// }

module.exports = {
  // 根据你的实际情况更改这里
  publicPath,
  lintOnSave: true,
  devServer: {
    publicPath, // 和 publicPath 保持一致
    disableHostCheck: process.env.NODE_ENV === 'development', // 关闭 host check，方便使用 ngrok 之类的内网转发工具
    proxy: proxyConfig
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: '@import \'~@/assets/style/public.scss\';'
      }
    }
  },
  pages,
  configureWebpack: config => {
    const configNew = {}
    if (process.env.NODE_ENV === 'production') {
      configNew.externals = externals
      configNew.plugins = [
        // gzip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      ]
    }
    return configNew
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    /**
     * 添加 CDN 参数到 htmlWebpackPlugin 配置中
     * 已适配多页
     */
    const htmlPluginNames = chain(pages).keys().map(page => 'html-' + page).value()
    const targetHtmlPluginNames = htmlPluginNames.length ? htmlPluginNames : ['html']
    each(targetHtmlPluginNames, name => {
      config.plugin(name).tap(options => {
        set(options, '[0].cdn', process.env.NODE_ENV === 'production' ? cdn : [])
        return options
      })
    })
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    config
      .plugin('theme-color-replacer')
      .use(ThemeColorReplacer, [{
        fileName: 'css/theme-colors.[contenthash:8].css',
        matchColors: [
          ...forElementUI.getElementUISeries(process.env.VUE_APP_ELEMENT_COLOR) // Element-ui主色系列
        ],
        externalCssFiles: ['./node_modules/element-ui/lib/theme-chalk/index.css'], // optional, String or string array. Set external css files (such as cdn css) to extract colors.
        changeSelector: forElementUI.changeSelector
      }])
    config
      // 开发环境
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('source-map')
      ) // 在WebStorm中调试需要source-map
      // 预览环境构建 vue-loader 添加 filename
      .when(process.env.VUE_APP_SCOURCE_LINK === 'TRUE',
        VueFilenameInjector(config, {
          propName: process.env.VUE_APP_SOURCE_VIEWER_PROP_NAME
        })
      )
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@d2views', resolve('src/d2admin/views/system'))
    // ignore ts-loader misleading warning
    // ref: https://github.com/TypeStrong/ts-loader/issues/653#issuecomment-390889335
    config
      .plugin('IgnoreNotFoundExportPlugin')
      .before('friendly-errors')
      .use(IgnoreNotFoundExportPlugin)
    // 判断环境加入模拟数据
    if (checkEnvEnabled('ENABLE_MOCK')) {
      const multiEntry = keys(pages || {})
      const entries = multiEntry.length ? multiEntry : ['app']
      each(entries, entry => {
        const e = config.entry(entry).add('@/d2admin/plugin/axios/mock-loader').end()
      })
    }
  },
  // 不输出 map 文件
  productionSourceMap: false,
  // i18n
  pluginOptions: {
    i18n: {
      locale: 'zh-chs',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    },
    ssh: uploadConfig
  }
}
