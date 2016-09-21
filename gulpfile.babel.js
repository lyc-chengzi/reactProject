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

const task_clean = () => {
    return del([paths.buildPath + "/**/*", paths.distPath + "/**/*"]);
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
    gulp.watch(paths.sourcePath+'/**/*.js', {readDelay: 2000}, ['webpack']);
};

export {task_clean, task_webpack, task_webpackDevServer, task_watch};

gulp.task('webpack-dev-server', ['clean'], task_webpackDevServer);

gulp.task('webpack', ['clean'], task_webpack);

gulp.task('clean', task_clean);

gulp.task('watch', task_watch);

gulp.task('default', ['watch', 'webpack'], ()=>{});
gulp.task('server', ['watch', 'webpack-dev-server'], ()=>{});