module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: true,
  // assetsDir: "static",
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    open: true,
    host: '192.168.10.106',
    port: 9000,
    hotOnly: false,
    proxy: {
      '/firefinch-api': {
        target: 'http://192.168.10.188:22080',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: config =>{
    const imgRule = config.module.rule('images');
    imgRule.use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 6144 }))
      .end();
    // const svgRule = config.module.rule('svg');
    // svgRule.use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    //   .end();
    // const mediaRule = config.module.rule(/\.(mp3)(\?.*)?$/);
    // mediaRule.use('url-loader')
    //   .loader('url-loader')
    //   .end();
  },
  css: {
    modules: true
  },
  transpileDependencies: ['axios', 'element-ui'],
  productionSourceMap: false,
};
