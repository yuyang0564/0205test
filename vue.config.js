const path = require('path')
const LodashWebpackPlugin = require('lodash-webpack-plugin')

//! 打包后生成图标
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


const isProd = process.env.NODE_ENV === 'production'
const cdnjs = [
  "https://s3.pstatp.com/cdn/expire-1-M/vue/2.6.10/vue.min.js",
  "https://s0.pstatp.com/cdn/expire-1-M/vue-router/3.0.6/vue-router.min.js",
  "https://s3.pstatp.com/cdn/expire-1-M/vuex/3.1.0/vuex.min.js",
  "https://s0.pstatp.com/cdn/expire-1-M/axios/0.19.0-beta.1/axios.min.js"
] 
module.exports = {
  
  // devServer: {
  //   proxy: {
  //     "/api" : {
  //       target: "https://www.fastmock.site/mock/636abbd5bc6b1660fcc65a3a92a5b85b/mock",
  //       secure: false,
  //       pathRewrite: {"^/api": ""}
  //     }
  //   }
  // },
  
  
  configureWebpack: config =>
  {
    config.devtool = 'cheap-module-eval-source-map'
    if (isProd) {
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'Axios'
      }
      config.devtool = 'none'
    }

  },
  
  chainWebpack: config => {
    if(isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdnjs
        return args
      })
    }
    
    config.plugin('lodashReplace').use(new LodashWebpackPlugin())

    //! 生成打包图表
    // config.plugin('analyzer').use(new BundleAnalyzerPlugin())
    config.resolve.alias
    .set('@c',path.resolve(__dirname,'src/components/'))
    .set('@v',path.resolve(__dirname,'src/views/'))
  }
}