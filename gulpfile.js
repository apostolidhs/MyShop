/* jshint node:true */

'use strict';

var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  notify = require('gulp-notify'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
  gulp.src('./public/css/my-shop.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('jshint', function () {
  gulp.src('./public/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('develop', function () {
  livereload.listen();
  gulp.watch('./public/js/*.js', ['jshint']);
  gulp.watch('./public/css/*.less', ['less']);
});


gulp.task('build', function () {
  gulp.start('jshint');
  gulp.src('./public/css/my-shop.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default', [
  'less',
  'develop'
]);
