/* jshint node:true */

'use strict';

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  jshint = require('gulp-jshint'),
  amdOptimize = require('amd-optimize'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  mustache = require('gulp-mustache'),
  runSequence = require('run-sequence');

gulp.task('clean', function(next) {
  del('./dist/').then(function() {next();});
});

gulp.task('jshint', function () {
  return gulp.src('./public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build-less', function () {
  return gulp.src('./public/css/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(concat('my-shop.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('build-fonts', function () {
  return gulp.src('./public/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('build-img', function () {
  return gulp.src('./public/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('build-requirejs', function() {
  return gulp.src('./public/components/requirejs/require.js')
    .pipe(uglify())
    .pipe(rename('require.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build-js', function() {
  return gulp.src('public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(amdOptimize('main', {
      baseUrl: './public/js',
      paths: {
        'jquery':       '../components/jquery/dist/jquery',
        'underscore':   '../components/underscore/underscore',
        'backbone':     '../components/backbone/backbone',
        'localstorage': '../components/backbone.localStorage/backbone.localStorage',
        'text':         '../components/requirejs-text/text',
        'async':        '../components/requirejs-plugins/src/async',
        'bootstrap':    '../components/bootstrap/dist/js/bootstrap.min'
      },
      shim: {
        'jquery': { exports: '$' },
        'backbone': {
          deps: ['underscore', 'jquery'],
          exports: 'backbone'
        },
        'underscore': { exports: '_' },
        'bootstrap': { 
          deps: [ 'jquery' ] 
        }
      }
    }))
    .pipe(concat('my-shop.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build-css', ['build-less'], function () {
  return gulp.src('public/css/my-shop.css')
    .pipe(csso())
    .pipe(rename('my-shop.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build-dev-html', function () {
  return gulp.src('public/index.mustache')
    .pipe(mustache({
        develop: true,
        cssPath: './css/my-shop.css',
        jsMainPath: './js/main.js',
        jsRequirePath: './components/requirejs/require.js'
      }, {extension: '.html'}))
    .pipe(gulp.dest('./public'));
});

gulp.task('build-prod-html', function () {
  return gulp.src('public/index.mustache')
    .pipe(mustache({
        develop: false,
        cssPath: './css/my-shop.min.css',
        jsMainPath: './js/my-shop.min.js',
        jsRequirePath: './js/require.min.js'
      }, {extension: '.html'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('develop', ['build-dev-html'], function () {
  livereload.listen();
  gulp.watch('./public/js/*.js', ['jshint']);
  gulp.watch('./public/css/*.less', ['build-less']);
  nodemon({
    script: 'bin/www'
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('build-dev', ['build-dev-html'], function () {
  gulp.start('jshint');
  gulp.src('./public/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('build', function(next) {
  runSequence('clean', ['build-js', 'build-requirejs', 'build-css', 'build-fonts', 'build-img', 'build-prod-html'], next);
});

gulp.task('default', ['build']);