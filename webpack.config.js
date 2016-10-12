/**
 * Created by liuyc14 on 2016/7/26. dev环境webpack配置
 */
var webpack = require('webpack');
var path = require('path');
const app_src = path.join(__dirname, './src');
var node_modules = path.resolve(__dirname,'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

console.log('~~~~~~~~~~~~~~~~load basic config file');
module.exports = {
    entry: {
        vendor: ["react", 'react-dom', 'lodash', 'redux'],
        homepage: [path.join(app_src, 'pages/homepage/index.js')],
        demo1: [path.join(app_src, 'pages/demo1/index.js')],
        demo2: [path.join(app_src, 'pages/demo2/index.js')],
        demo3: [path.join(app_src, 'pages/demo3/index.js')],
        demo4: [path.join(app_src, 'pages/demo4/index.js')],
        demo5: [path.join(app_src, 'pages/demo5/index.js')]
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "bundle_[name].js",
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            {
                test: /\.jade$/,
                loaders: ['jade'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style','css'],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                loader: "url?limit=8092"
            },
            {
                // required for bootstrap icons
                test: /\.(woff|woff2)(\?(.*))?$/,
                loader: 'url?prefix=factorynts/&limit=5000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?(.*))?$/,
                loader: 'file?prefix=fonts/'
            },
            {
                test: /\.eot(\?(.*))?$/,
                loader: 'file?prefix=fonts/'
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        })
    ],
    resolve: {
        //查找module的话从这里开始查找
        root: app_src, //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            //react和react-dom直接读取min文件，不再单独编译
            //'react': pathToReact,
            //'react-dom': pathToReactDom,
            //后续直接 require('FilterableProductTable') 即可
            'FilterableProductTable' : 'component/FilterableProductTable/FilterableProductTable.js'
        }
    },
    devtool: 'source-map'
};
