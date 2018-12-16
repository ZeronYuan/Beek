module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-else-return': 'off',
    "linebreak-style": [0,"error", "windows"],
    'vue/max-attributes-per-line':'0',
    'vue/singleline-html-element-content-newline':'0',
    'vue/html-self-closing':'0',
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb'
  ]
};
