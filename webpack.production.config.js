/**
 * Created by liuyc14 on 2016/7/26.  生产环境的webpack配置
 */
var webpack = require('webpack');
var path = require('path');
const app_src = path.join(__dirname, './src');
var basicConfig = require('./webpack.config');

console.log('~~~~~~~~~~~~~~~~using production webpack config file');
delete basicConfig.devtool;

//生产环境压缩代码
basicConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false  // remove all comments
        }
    })
);

module.exports = basicConfig;
