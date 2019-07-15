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
    'vue/max-attributes-per-line': '0',
    'vue/component-name-in-template-casing': '0',
    'vue/singleline-html-element-content-newline': '0',
    'vue/html-closing-bracket-newline': '0',
    'vue/html-self-closing': '0',
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
  ],
};
