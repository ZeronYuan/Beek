import http from './http';

const $FUIhttp = {};

$FUIhttp.install = function install(vue) {
  vue.prototype.$FUIhttp = http;
};

export default $FUIhttp;
