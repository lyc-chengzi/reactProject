/**
 * Created by liuyc14 on 2016/7/26.
 */
var gulp = require("gulp");
var del = require("del");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var paths = {
    distPath: './dist',
    buildPath: './build',
    sourcePath: './src'
};

gulp.task('clean', function () {
    return del([paths.buildPath + "/**/*.js", paths.distPath + "/**/*.js"]);
});

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

gulp.task('default', ['webpack'], function () {

});