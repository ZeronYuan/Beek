module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es6: true,
  },

  // parser: 'babel-eslint',

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-debugger': 'off',
    'no-param-reassign': 'off',
    'vue/html-quotes': 'off',
    'func-names': 'off',
    camelcase: 'off',
    'object-shorthand': 'off',
    'no-else-return': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'max-len': 'off',
    //'vue/require-v-for-key': '0',
    'vue/max-attributes-per-line': 'off',
    'vue/component-name-in-template-casing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-self-closing': 'off',
  },

};
