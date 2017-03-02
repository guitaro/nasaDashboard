'use strict';

var gulp = require('gulp');
var conf = require('./conf');

gulp.task('watch', function () {
    gulp.watch(conf.paths.assets + '/styles/**/*.scss', ['build']);
});