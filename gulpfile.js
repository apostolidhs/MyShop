/* jshint node:true */

'use strict';

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  notify = require('gulp-notify'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
  gulp.src('./public/css/*.less')
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
  nodemon({
    script: 'bin/www'
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});


gulp.task('build', function () {
  gulp.start('jshint');
  gulp.src('./public/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default', [
  'less',
  'develop'
]);
