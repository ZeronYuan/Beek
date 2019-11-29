// import '@babel/polyfill';
// import 'babel-polyfill'; // ES6转换
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import VueI18n from 'vue-i18n';
// import elementEn from 'element-ui/lib/locale/lang/en';
// import elementCn from 'element-ui/lib/locale/lang/zh-CN';
// import zh_CN from './local/zh_CN';
// import en_US from './local/en_US';
import baseUtil from './util/baseUtil';
import Element from './element/index';
import App from './App.vue';
import router from './router/router';
import store from './store/index';
import http from './plugins/http/http';
import httpPlugin from './plugins/http/httpPlugin';

Vue.config.productionTip = false;
const { VueECharts } = window; // ECharts方法
Vue.component('v-chart', VueECharts); // 注册ECharts组件
Vue.use(VueAxios, axios);
Vue.use(httpPlugin);
Vue.use(Element); // 按需加载element-ui组件
// Vue.use(VueI18n);
// Vue.config.lang = store.state.lang || 'zh_CN';
// Vue.locale('en_US', baseUtil.merge(elementEn, en_US));
// Vue.locale('zh_CN', baseUtil.merge(elementCn, zh_CN));
const VueInit = Vue.prototype;
// 获取单位
// store.dispatch('GET_UNIT');
// 获取系统时间
store.dispatch('GET_SYSTEMTIME');
// 请求code状态码处理提示
http.setErrorHandler((dataPacket) => {
  const errorCode = dataPacket.code;
  const code = errorCode.charAt(0);
  switch (code) {
    case '1': // 消息
      VueInit.$message(dataPacket.msg);
      break;
    case '2': // 警告
      VueInit.$message({
        message: dataPacket.msg,
        type: 'warning',
      });
      break;
    case '3': // 错误
      VueInit.$message.error(dataPacket.msg);
      break;
    default:
      // 默认code为0请求成功，数据无异常状态
      // 这里只处理HTTP状态码为200时的请求，其它状态码都会提示请求错误
      break;
  }
});
window.onload = () => {
  // loading界面关闭
  const loadDom = document.querySelector('#loading');
  const browser = baseUtil.browser();
  setTimeout(() => {
    loadDom.className = 'fadeOutDown animated';// flipOutY zoomOutUp
    loadDom.addEventListener('animationend', () => {
      if (browser === 'IE') {
        loadDom.parentNode.removeChild(loadDom);
        loadDom.removeNode(true);
      } else {
        loadDom.remove();
      }
    });
  }, 1600);
};
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#Firefinch');
