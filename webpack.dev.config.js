/**
 * Created by liuyc14 on 2016/7/26. dev环境webpack配置
 */
var webpack = require('webpack');
var path = require('path');
const app_src = path.join(__dirname, './src');

var basicConfig = require('./webpack.config');
console.log('~~~~~~~~~~~~~~~~using dev webpack config file');

basicConfig.devServerPort = '9999';
basicConfig.devServerProxyIP = '10.120.2.3';
basicConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = basicConfig;
