import http from '../../plugins/http/http';
import baseUtil from '../../util/baseUtil';

const httpList = http.apiList;
let timer = '';
const common = {
  state: {
    lang: 'zh_CN',
    systemTime: '',
    wlanStatus: false,
    wlanList: [],
  },
  actions: {
    GET_SYSTEMTIME({ commit }) {
      http.api[httpList.GetDatetime]({
        success(response) {
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
    GET_WLANLIST({ commit }) {
      http.api[httpList.GetScanResult]({
        success(response) {
          const data = response;
          http.api[httpList.GetConnectedHotpad]({
            success(reponse2) {
              baseUtil.each(data, (el) => {
                el.Status = 0;
                el.Hold = false;
                el.NetID = '';
                el.Priority = '';
                el.Selected = '';
                baseUtil.each(reponse2, (el2) => {
                  if (el.SSID === el2.SSID) {
                    el.Status = el2.Status;
                    el.Hold = true;
                    el.NetID = el2.NetID;
                    el.Priority = el2.Priority;
                    el.Selected = el2.Selected;
                  }
                });
              });
              commit('SET_WLANLIST', data);
            },
          });
        },
      });
    },
    GET_WLANSTATUS({ commit }) {
      http.api[httpList.IsOpened]({
        success(response) {
          commit('SET_WLANSTATUS', response);
        },
      });
    },
  },
  mutations: {
    SET_SYSTEMTIME: (state, payload) => {
      state.systemTime = payload;
    },
    SET_WLANLIST: (state, payload) => {
      state.wlanList = payload;
    },
    SET_WLANSTATUS: (state, payload) => {
      state.wlanStatus = payload;
    },
  },
  getter: {},
};

export default common;
