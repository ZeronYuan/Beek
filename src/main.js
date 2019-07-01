import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueI18n from 'vue-i18n';
import elementEn from 'element-ui/lib/locale/lang/en';
import elementCn from 'element-ui/lib/locale/lang/zh-CN';
import zh_CN from './local/zh_CN';
import en_US from './local/en_US';
import Element from './element/index';
import App from './App.vue';
import router from './router/router';
import store from './store/index';
import baseUtil from './util/baseUtil';
import http from './plugins/http/http';
import httpPlugin from './plugins/http/httpPlugin';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.use(httpPlugin);
Vue.use(Element); // 按需加载element-ui组件
Vue.config.lang = store.state.lang || 'zh_CN';
Vue.locale('en_US', baseUtil.merge(elementEn, en_US));
Vue.locale('zh_CN', baseUtil.merge(elementCn, zh_CN));
const VueInit = Vue.prototype;
store.dispatch('GET_UNIT');
http.setErrorHandler((dataPacket) => {
  const errorCode = dataPacket.code;
  const code = errorCode.charAt(0);
  switch (code) {
    case '1':
      VueInit.$message(dataPacket.msg);
      break;
    case '2':
      VueInit.$message({
        message: dataPacket.msg,
        type: 'warning',
      });
      break;
    case '3':
      VueInit.$message.error(dataPacket.msg);
      break;
    default:
      // console.log('***********');
      break;
  }
});
window.onload = () => {
  const loadDom = document.querySelector('#loading');
  setTimeout(() => {
    // loadDom.className = 'fadeOutDown animated';// flipOutY
    loadDom.remove();
  }, 2000);
};
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#Firefinch');
