import http from '../../plugins/http/http';

const httpList = http.apiList;
let timer = '';
const common = {
  state: {
    lang: 'zh_CN',
    unit: {},
    systemTime: '',
  },
  actions: {
    GET_UNIT({ commit }) {
      http.api[httpList.getAvaiableUnits]({
        method: 'post',
        success(response) {
          // console.log(response);
          commit('SET_UNIT', response);
        },
      });
    },
    GET_SYSTEMTIME({ commit }) {
      http.api[httpList.GetDatetime]({
        success(response) {
          console.log(response);
          let time = response;
          clearInterval(timer);
          commit('SET_SYSTEMTIME', response);
          timer = setInterval(() => {
            time++;
            commit('SET_SYSTEMTIME', time.toString());
          }, 1000);
        },
      });
    },
  },
  mutations: {
    SET_UNIT: (state, payload) => {
      state.unit = payload;
    },
    SET_SYSTEMTIME: (state, payload) => {
      state.systemTime = payload;
    },
  },
  getter: {},
};

export default common;
