/* eslint-disable */
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol',
        'es6.set',
        // 'es6.map',
        // 'es6.filter',
        // 'es6.every',
        // 'es6.some',
        // 'es6.reduce',
        // 'es6.reduceRight',
      ],
      useBuiltIns: 'usage',
    }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName":"element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
};
