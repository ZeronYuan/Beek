import http from '../../plugins/http/http';

const httpList = http.apiList;
const common = {
  state: {
    lang: 'zh_CN',
    unit: {},
  },
  actions: {
    GET_UNIT({ commit }) {
      http.api[httpList.getAvaiableUnits]({
        method: 'post',
        success(response) {
          console.log(response);
          commit('SET_UNIT', response);
        },
      });
    },
  },
  mutations: {
    SET_UNIT: (state, payload) => {
      state.unit = payload;
    },
  },
};

export default common;
