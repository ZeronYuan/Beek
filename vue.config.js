/* eslint-disable */
const proxy_url = 'http://192.168.200.202:80';
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
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
    port: 8080,
    proxy: {
      '/firefinch-api': {
        target: proxy_url,
        ws: true,
        changeOrigin: true,
      },
      '/images': {
        target: proxy_url,
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
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload');
    /* 添加分析工具*/
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config.plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end();
      }
    }
    /*添加loader*/
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
    extract: false, // 开发时设为false，打包前设为true
    modules: false,
    sourceMap: false,
  },
  productionSourceMap: false,
};
