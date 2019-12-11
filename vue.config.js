/* eslint-disable */
const os = require('os');
// const CompressionPlugin = require("compression-webpack-plugin");
const proxy_url = 'http://192.168.200.201:80'; // 代理目标服务器地址
// const proxy_url = 'http://192.168.200.222:80';
const interfaces = os.networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
let IPAdress = '';
for(let devName in interfaces){
  let iface = interfaces[devName];
  for(let i=0;i<iface.length;i++){
    var alias = iface[i];
    if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
      IPAdress = alias.address;
    }
  }
}
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
    // 'pl-table'
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
    host: IPAdress,
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
      '/Settings': {
        target: proxy_url,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.externals({
      // 'vue': 'Vue',
      // 'vue-router': 'VueRouter',
      // 'vuex': 'Vuex',
      // 'axios': 'axios',
      // 'element-ui': 'ELEMENT',
      'vue-echarts': 'Echarts',
    });
    const entry = config.entry('app');
    // entry
    //   .add('@babel/polyfill')
    //   .end();
    // entry
    //   .add('classlist-polyfill')
    //   .end();
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
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
    // extract: false, // 开发时为false，打包前为true
    requireModuleExtension: true,
    // sourceMap: false,
  },
  // configureWebpack:config=>{
  //   if(progress.env.NODE_ENV === 'production'){
  //     return{
  //       plugins: [
  //
  //         new CompressionPlugin({
  //           test:/\.js$|\.html$|.\css/, //匹配文件名
  //           threshold: 10240,//对超过10k的数据压缩
  //           deleteOriginalAssets: false //不删除源文件
  //         })
  //       ]
  //     }
  //   }
  //
  // },
  // productionGzip: true,
  productionSourceMap: false,
};
