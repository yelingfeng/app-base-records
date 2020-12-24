/*
 * @Author: renxiaofan
 * @Date: 2020-03-23 17:15:15
 * @LastEditors: niumiaomiao
 * @LastEditTime: 2020-04-24 18:19:43
 * @Description:
 */
const path = require('path')
const IS_PROD = ['production', 'prod', 'test'].includes(process.env.NODE_ENV)
const devServerPort = 8111 // TODO: get this variable from setting.ts
const name = 'netSecur' // TODO: get this variable from setting.ts

const publicPath = IS_PROD ? '/netSecur/' : '/'
// const mockServer = 'http://172.17.20.226:8010/mockjsdata/1'
const mockServer = 'http://172.17.20.226:8080/'

module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: mockServer,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: '[name]_[hash:base64:8]'
        },
        localsConvention: 'camelCaseOnly'
      }
    }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
    // config.module
    //   .rule(/\.(js|ts|vue)$/)
    //   .use('eslint-loader')
    //   .loader('eslint-loader')
    //   .options({
    //     formatter: require('eslint-friendly-formatter')
    //   })

    // https://webpack.js.org/configuration/devtool/#development
    config.when(!IS_PROD, config => config.devtool('cheap-eval-source-map'))

    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
    // replace with another progress output plugin to solve the this bug:
    // https://github.com/vuejs/vue-cli/issues/4557
    // config.plugin('simple-progress-webpack-plugin').use(require.resolve('simple-progress-webpack-plugin'), [
    //   {
    //     format: 'compact',
    //   },
    // ])

    config.when(!IS_PROD, config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
