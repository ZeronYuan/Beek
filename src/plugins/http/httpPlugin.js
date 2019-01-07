import http from './http';

const $Fuihttp = {};

$Fuihttp.install = function install(vue) {
  const Vue = vue;

  Vue.prototype.$Fuihttp = http;
};

export default $Fuihttp;
