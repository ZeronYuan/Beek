import Vue from 'vue';
import axios from 'axios';
// import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import http from './plugins/http/http';

Vue.config.productionTip = false;
Vue.use(axios);

http.setErrorHandler((dataPacket) => {
  const errorCode = dataPacket.error_code;
  switch (errorCode) {
    case '201':
      break;
    case '301':
      break;
    case '303':
      break;
    default:
      break;
  }
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
