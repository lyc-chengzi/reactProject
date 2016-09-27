/**
 * Created by liuyc14 on 2016/7/26.
 */
import gulp from 'gulp';
import del from 'del';
import webpack from 'webpack';
let webpackConfig;
let _env = process.env.NODE_ENV;
console.log("_env now is " + _env);
if(_env === "production"){
    webpackConfig = require("./webpack.production.config");
}else{
    webpackConfig = require("./webpack.dev.config");
}

const paths = {
    distPath: './dist',
    buildPath: './build',
    sourcePath: './src'
};

/*********************基础任务*********************/

const task_copy = () => {
    return gulp.src(paths.distPath+"/**/*").pipe(gulp.dest('./public/dist'));
};

const task_clean = () => {
    return del([paths.buildPath + "/**/*", paths.distPath + "/**/*", './public/dist/*']);
};

const task_webpack = (done) => {
    webpack(webpackConfig, function (err, stats) {
        console.log('[webpack:build]', stats.toString({
            colors: true
        }));

        var webpackErrors = stats.compilation.errors;
        if (err || (webpackErrors && webpackErrors.length)) {
            console.error(err);
            console.error(stats.compilation.errors);
        }
        done();
    });
};

const task_webpackDevServer = (done) => {
    var WebpackDevServer = require('webpack-dev-server');
    //开发环境启动 webpack-dev-server
    webpackConfig.debug = true;

    webpackConfig.entry.Dev = [
        "webpack/hot/dev-server",
        "webpack-dev-server/client?http://0.0.0.0:" + webpackConfig.devServerPort];
    let server = new WebpackDevServer(webpack(webpackConfig), {
        contentBase: '',
        // 资源是否启用gzip压缩
        compress: false,
        quiet: false,
        noInfo: false,
        hot: true,
        inline: true,
        lazy: false,
        progress: true,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300
        },
        proxy: {
            '/moto-store/*': {
                rewrite: function (req) {
                    req.url = req.url.replace(/^\/moto-store/, '/moto-store/');
                },
                target: webpackConfig.devServerProxyIP
            }
        },
        stats: {
            colors: true
        }
    });

    server.listen(webpackConfig.devServerPort, '0.0.0.0', function (err) {
        if (err) {
            throw new Error('webpack-dev-server', err);
        }
        console.log('[webpack-dev-server] is started, and now you can visit http://localhost:' + webpackConfig.devServerPort);
    });
    done();
};

const task_watch = () => {
    gulp.watch(paths.sourcePath+'/**/*.js', {readDelay: 2000}, gulp.series(task_clean, task_webpack, task_copy));
};

export {task_clean, task_webpack, task_webpackDevServer, task_watch, task_copy};

/*********************用户调用任务*********************/
//默认构建任务，将源码打包到目标目录
const task_build = gulp.parallel(task_watch, gulp.series(task_clean, task_webpack, task_copy));
export {task_build};
export default task_build;

//用于生产环境的打包
const task_production = gulp.series(task_clean, task_webpack, task_copy);
export {task_production};

//打包项目，并启用webpack-dev-server服务器
const task_server = gulp.series(task_clean, task_webpackDevServer);
export {task_server};