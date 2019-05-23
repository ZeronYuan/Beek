/* eslint-disable */
const t_url = 'http://192.168.200.202:80';
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
    host: '192.168.200.5',
    port: 6969,
    proxy: {
      '/firefinch-api': {
        target: t_url,
        ws: true,
        changeOrigin: true,
      },
      '/images': {
        target: t_url,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    // config.externals({
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vuex': 'Vuex',
    //   'axios': 'axios',
    //   'element-ui': 'ELEMENT'
    // });
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
  },
  css: {
    modules: false,
  },
  productionSourceMap: false,
  //cssSourceMap: false,
};
