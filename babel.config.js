/* eslint-disable */
module.exports = {
  presets: [
    '@vue/app',
    {
      // polyfills: [
      //   'es6.promise',
      //   'es6.symbol',
      // ],
      // useBuiltIns:'./src/main.js'
    },
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
