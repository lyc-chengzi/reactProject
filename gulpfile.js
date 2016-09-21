/**
 * Created by liuyc14 on 2016/7/26.
 */
var gulp = require("gulp");
var gulp_watch = require('gulp-watch');
var del = require("del");
var webpack = require("webpack");
var webpackConfig;
var _env = process.env.NODE_ENV;
console.log("_env now is " + _env);
if(_env === "production"){
    webpackConfig = require("./webpack.production.config");
}else{
    webpackConfig = require("./webpack.dev.config");
}

var paths = {
    distPath: './dist',
    buildPath: './build',
    sourcePath: './src'
};

gulp.task('clean', function () {
    return del([paths.buildPath + "/**/*", paths.distPath + "/**/*"]);
});



if(_env === 'devServer'){
    var WebpackDevServer = require('webpack-dev-server');
    //开发环境启动 webpack-dev-server
    webpackConfig.debug = true;

    webpackConfig.entry.Dev = ["webpack/hot/dev-server",
        "webpack-dev-server/client?http://0.0.0.0:" + webpackConfig.devServerPort];

    gulp.task('webpack', ['clean'], function (done) {
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
    });
} else {
    gulp.task('webpack', ['clean'], function (done) {
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
    });
}

gulp.task('watch', function(){
    gulp.watch(paths.sourcePath+'/**/*.js', {readDelay: 2000}, ['webpack']);
});

gulp.task('default', ['watch', 'webpack'], function () {

});