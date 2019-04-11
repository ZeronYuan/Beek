import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';// Vuex持久化插件
import common from './modules/common';
import user from './modules/user';
import getter from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    common,
    user,
  },
  getter,
  plugins: [createPersistedState({
    storage: window.localStorage,
  })],
});
