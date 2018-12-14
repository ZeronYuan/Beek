import axios from 'axios';
import baseUtil from '../../util/baseUtil';
import logger from '../../util/logger';
import apiList from './apiList';
import loopRequest from './loopRequest';
// import specialHandler from './specialHandler';

console.log(axios);
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
  const errorCode = dataPacket.error_code;
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
  logger.error(error);
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
      param, responseHandler, dataPacketHandler, dataHandler,
    } = options;
    /*
    const param = options.param || {};
    const responseHandler = options.responseHandler;
    const dataPacketHandler = options.dataPacketHandler;
    const dataHandler = options.dataHandler;
    */

    axiosInstance[method](url, param)
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
      if (dataPacket.error_code !== '0') {
        fail(dataPacket);
      }
    };
    const dataHandler = (data) => {
      /*
        if (specialHandler[url]) {
          specialHandler[url](data);
      }
      */
      success(data);
    };
    const param = baseUtil.copy(commonParam);
    baseUtil.merge(param, options.param, true);
    const postOptions = {
      param,
      responseHandler,
      dataPacketHandler,
      dataHandler,
    };
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
  /*
  isBreak = true,
  if (isBreak) {
    if (ycjUtil.isEnd()) {
      http.api[api](opts);
    } else {
      loop = loopRequest.add(() => {
        http.api[api](opts);
        if (ycjUtil.isEnd()) {
          loopRequest.remove(loop, channel);
        }
      }, channel);
    }
  } else {
    loop = loopRequest.add(() => {
      http.api[api](opts);
    }, channel);
  }
  */
  const loop = loopRequest.add(() => {
    http.api[api](opts);
  }, channel);
  return [loop, channel];
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
