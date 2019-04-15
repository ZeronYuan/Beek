/* eslint-disable */
/*测试打包后Vue文件*/
const fs = require('fs');
const url = require('url');
const path = require('path');
/*npm  安装这4个依赖包*/
const child_process = require("child_process");
const mime = require('mime');
const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
/*本地资源服务*/
app.use('/dist', function (request, response) {
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

/*反向代理服务*/
const api_list = [{
    api:'/firefinch-api',
    option:{
        target: 'http://192.168.200.191:80', // 目标主机
        changeOrigin: true,                    // 需要虚拟主机站点
        ws: true                               // 是否代理websocket
    }
},{
    api:'/images',
    option:{
        target: 'http://192.168.200.191:80',
        changeOrigin: true,
        ws: true
    }
},{
        api: '/defalut',
        option: {
            target: 'http://192.168.200.191:80',
            changeOrigin: true,
            ws: true
        }
    }];
api_list.forEach(function(el){
    let exampleProxy = proxy(el.option);  //代理配置.
    app.use(el.api, exampleProxy);        //开启代理功能，并加载配置
});

/*监听端口服务*/
app.listen(9696, function () {
    console.log('Server running at http://192.168.200.5:9696');
    child_process.exec('start http://192.168.200.5:9696/dist/index.html');
});
