'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var webserver = require('gulp-webserver');

gulp.task('serve', function(){
    gulp.src(conf.paths.src)
        .pipe(webserver({
            port: 3000
        }));
});