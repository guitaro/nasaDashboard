'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src(conf.paths.assets + '/styles/blur-admin/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(conf.paths.dist + '/styles/'));
});