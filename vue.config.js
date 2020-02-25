const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
const cdnjs = [
  "https://s3.pstatp.com/cdn/expire-1-M/vue/2.6.10/vue.min.js",
  "https://s0.pstatp.com/cdn/expire-1-M/vue-router/3.0.6/vue-router.min.js",
  "https://s3.pstatp.com/cdn/expire-1-M/vuex/3.1.0/vuex.min.js",
  "https://s0.pstatp.com/cdn/expire-1-M/axios/0.19.0-beta.1/axios.min.js"
] 
module.exports = {
  configureWebpack: config =>
  {
    if (isProd) {
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'Axios'
      }
    }
  },
  
  chainWebpack: config => {
    if(isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdnjs
        return args
      })
    }
    config.resolve.alias
    .set('@c',path.resolve(__dirname,'src/components/'))
    .set('@v',path.resolve(__dirname,'src/views/'))
  }
}