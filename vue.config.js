/* eslint-disable */
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: true,
  devServer: {
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,
    open: true,
    host: '127.0.0.1',
    port: 9080,
    proxy: {
      '/service': {
        target: 'http://ip.taobao.com',
        ws: true,
        changeOrigin: true,
      },
      '/likePoetry': {
        target: 'https://api.apiopen.top',
        ws: true,
        changeOrigin: true,
      },
      '/firefinch-api': {
        target: 'http://192.168.10.190:80',
        ws: true,
        changeOrigin: true,
      },
      '/images': {
        target: 'http://192.168.10.190:80',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    const module = config.module;
    module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 5120 }))
      .end();
    module
      .rule('fonts')
      .test(/\.(ttf|eot|woff|woff2|svg)$/)
      .use('url-loader')
      .loader('url-loader')
      .end();
    // config.externals({
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vuex': 'Vuex',
    //   'axios': 'axios',
    //   'element-ui': 'ELEMENT'
    // })
  },
  css: {
    modules: false,
  },
  // transpileDependencies: ['axios', 'element-ui', 'vue-axios'],
  productionSourceMap: false,
};
