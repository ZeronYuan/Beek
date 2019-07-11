import Vue from 'vue';
import axios from 'axios';
import baseUtil from '../../util/baseUtil';
import logger from '../../util/logger';
import apiList from './apiList';
import loopRequest from './loopRequest';
// import specialHandler from './specialHandler';

const commonParam = {};
let errorHandler = () => {};

const http = {
  api: {},
};

const env = process.env.NODE_ENV;
const axiosConfig = {
  method: 'get',
  baseURL: env === 'production' ? '' : '',
  timeout: 120000,
};

const ajaxMethod = ['get', 'post'];

/**
 * @param {object} response
 * @param {object} response.data - 数据包
 * @param {string} response.data.error_code - 错误编码
 * @param {function} responseHandler
 * @return {object}
 */
const ResponseHandler = (response, responseHandler) => {
  if (response && response.data && typeof responseHandler === 'function') { // respond 处理层
    responseHandler(response);
    return response.data;
  }
  return response;
};

const DataPacketHandler = (dataPacket, dataPacketHandler) => { // error_code 处理层
  const errorCode = dataPacket.code;
  const packet = dataPacket.data;
  if (typeof dataPacketHandler === 'function') {
    dataPacketHandler(dataPacket);
  }

  if (typeof errorHandler === 'function') {
    errorHandler(dataPacket);
  }
  if (dataPacket && errorCode === '0') { // 修复 complete bug
    return packet;
  }
  return false;
};
const DataHandler = (data, dataHandler) => { // 数据处理层
  if (data && typeof dataHandler === 'function') {
    dataHandler(data);
  }
};
const CatchHandler = (error) => {
  const VueInit = Vue.prototype;
  const { response } = error;
  logger.error(error);
  // console.log(response);
  VueInit.$notify.error({
    title: response.statusText,
    dangerouslyUseHTMLString: true,
    message: `<p style="width:250px;display:inline-block;color: #C20000;font-size: 14px;word-wrap:break-word;">${response.config.url}</p><br><p>接口请求失败，请联系管理员</p>`,
    duration: 0,
  });
};

const axiosInstance = axios.create(axiosConfig);

http.axios = axiosInstance;

baseUtil.each(ajaxMethod, (method) => {
  /**
   * @param {string} url api地址 -
   * @param {object} [options] 配置参数
   * @param {object} options.param
   * @param {function} options.responseHandler
   * @param {function} options.dataPacketHandler
   * @param {function} options.dataHandler
   */
  http[method] = (url, options) => {
    const {
      params, responseHandler, dataPacketHandler, dataHandler,
    } = options;
    axiosInstance[method](url, { params })
      .then(response => ResponseHandler(response, responseHandler))
      .then(dataPacket => DataPacketHandler(dataPacket, dataPacketHandler))
      .then(data => DataHandler(data, dataHandler))
      .catch(CatchHandler);
  };
});

baseUtil.each(apiList, (url) => {
  http.api[url] = (options) => {
    const method = options.method || 'get';
    const respond = options.respond || function respond() {};
    const success = options.success || function success() {};
    const fail = options.fail || function fail() {};
    const complete = options.complete || function complete() {};

    const responseHandler = response => respond(response);
    const dataPacketHandler = (dataPacket) => {
      complete(dataPacket);
      if (dataPacket.code !== '0') {
        fail(dataPacket);
      }
    };
    const dataHandler = (data) => {
      /*
      // 需要对数据进行特殊处理的接口，会经过这一层
        if (specialHandler[url]) {
          specialHandler[url](data);
      }
      */
      success(data);
    };
    const params = baseUtil.copy(commonParam);
    baseUtil.merge(params, options.params, true);
    const postOptions = {
      params,
      responseHandler,
      dataPacketHandler,
      dataHandler,
    };
    // console.log(Vue.prototype);
    if (method === 'post') {
      http.post(url, postOptions);
    } else if (method === 'get') {
      http.get(url, postOptions);
    }
  };
});

http.all = (requests, callback) => {
  if (!baseUtil.isObject(requests) || !baseUtil.isArray(requests)) {
    return;
  }
  axios.all(requests)
    .then(axios.spread((acc, pres) => {
      callback(acc, pres);
    }));
};
http.loop = (api, opts, channel = loopRequest.channel.HALF_MINUTE) => {
  const loop = loopRequest.add(() => {
    http.api[api](opts);
  }, channel);
  return [loop, channel];// 此处返回值用于remove对应的循环请求
  /*
  * 示例：
  // 发起循环请求
  httpLoop = http.loop(httpList.TEST, {
        method: 'get',
        params: {
          ip: '63.223.108.42',
        },
        success(response) {
          console.log(response);
          vm.ip = response;
        },
      }, http.loop.channel.ONE_MINUTE);
      //remove 操作（停止循环请求）
      http.loop.remove(...httpLoop);
  * */
};
http.loop.channel = loopRequest.channel;
http.loop.remove = (item, channel) => {
  loopRequest.remove(item, channel);
};


http.apiList = apiList;
http.setCommonParam = (param) => {
  baseUtil.merge(commonParam, param, true);
};
http.setErrorHandler = (eh) => {
  errorHandler = eh;
};

export default http;
