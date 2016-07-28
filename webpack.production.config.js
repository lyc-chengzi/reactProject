/**
 * Created by liuyc14 on 2016/7/26.  生产环境的webpack配置
 */
var webpack = require('webpack');
var path = require('path');
const app_src = path.join(__dirname, './src');

console.log('~~~~~~~~~~~~~~~~using production webpack config file')
module.exports = {
    entry: {
        vendor: ["react", 'react-dom'],
        homepage: [path.join(app_src, 'pages/homepage/index.js')],
        demo1: [path.join(app_src, 'pages/demo1/index.js')]
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: "bundle_[name].js"
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js"
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false  // remove all comments
            }
        })
    ],
    resolve: {
        //查找module的话从这里开始查找
        root: app_src, //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            //后续直接 require('FilterableProductTable') 即可
            FilterableProductTable : 'component/FilterableProductTable/FilterableProductTable.js'
        }
    }
};
