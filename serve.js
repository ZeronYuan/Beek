/* eslint-disable */
/*测试打包后Vue文件*/
const fs = require('fs');
const url = require('url');
const path = require('path');
const child_process = require("child_process");
const os = require('os');
/*npm  安装这3个依赖包*/
const mime = require('mime');
const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const t_url = 'http://192.168.200.202:80'; // 代理目标服务器地址
const interfaces = os.networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
let IPAdress = '';
for(let devName in interfaces){
  let iface = interfaces[devName];
  for(let i=0;i<iface.length;i++){
    var alias = iface[i];
    if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
      IPAdress = alias.address;
    }
  }
}
/*反向代理服务*/
const api_list = [
  {
    api:'/DeviceTopology',
    option: {
      target: t_url,
      ws: true,
      changeOrigin: true,
    },
  },
  {
    api:'/Settings',
    option: {
      target: t_url,
      ws: true,
      changeOrigin: true,
    },
  },
 ];
api_list.forEach(function(el){
    let exampleProxy = proxy(el.option);  //代理配置.
    app.use(el.api, exampleProxy);        //开启代理功能，并加载配置
});

//app.use(express.static(path.join(__dirname, 'dist')));
/*本地资源服务*/
app.use(express.static(path.join(__dirname, 'dist')), function (request, response) {
  let pathName = url.parse(request.url).pathname;
  let realPath = request.url.substring(1);
  let extName = realPath;
  let indexOfQuestionMark = extName.indexOf('?');
  if (indexOfQuestionMark >= 0) {
    extName = extName.substring(0, indexOfQuestionMark);
    realPath = realPath.substring(0, indexOfQuestionMark);
  }
  extName = path.extname(extName);
  extName = extName ? extName.slice(1) : 'unknown';
  if (!fs.existsSync(realPath)) {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.write('The request URL:' + realPath + ' could not be found.');
    response.end();
    return;
  }
  fs.readFile(realPath,function(err, file) {
    if (err) {
      response.writeHead(500, { 'content-type': 'text/plain' });
      response.end(err);
      return;
    }
    let contentType = mime.getType(path.basename(realPath)) || 'text/plain';
    response.writeHead(200, { 'content-type': contentType});
    response.write(file);
    response.end();
  });
});

/*监听端口服务*/
app.listen(9090, function () {
    console.log(`Server running at ${IPAdress}:9090`);
    child_process.exec(`start http://${IPAdress}:9090`);
});
