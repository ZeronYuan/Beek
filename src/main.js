import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueI18n from 'vue-i18n';
import Element from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import baseUtil from './util/baseUtil';
import http from './plugins/http/http';

const ffZh = {
  ff: {
    test: '测试测试',
  },
};
const ffEn = {
  ff: {
    test: 'testtest',
  },
};

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.use(Element);
Vue.config.lang = 'zh-cn';
Vue.locale('en', baseUtil.merge(enLocale, ffEn));
Vue.locale('zh-cn', baseUtil.merge(zhLocale, ffZh));
console.log(Vue.constructor);
const VueInit = Vue.prototype;
http.setErrorHandler((dataPacket) => {
  const errorCode = dataPacket.code;
  switch (errorCode) {
    case 200:
      console.log(dataPacket);
      VueInit.$message({
        message: 'succ',
        type: 'success',
      });
      break;
    case 0:
      console.log(dataPacket);
      VueInit.$message({
        message: 'succ',
        type: 'success',
      });
      break;
    default:
      console.log('***********');
      break;
  }
});
// console.log(zhLocale);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#Firefinch');
