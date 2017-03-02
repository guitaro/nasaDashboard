'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var conf = require('./conf');

gulp.task('clean', function () {
  return gulp.src([conf.paths.dist + '/css'])
      .pipe(clean());
});

gulp.task('build', ['styles']);
