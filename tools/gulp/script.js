const gulp = require('gulp');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const browser = require('browser-sync');

const conf = require('../config');
const confDevelopment = require('../webpack/development');
const confProduction = require('../webpack/production');

gulp.task('script', () => (
  plumber()
    .pipe(webpackStream(confDevelopment, webpack))
    .pipe(gulp.dest(`${conf.dest.dev}/js`))
    .pipe(browser.reload({ stream: true }))
));

gulp.task('b.script', () => (
  webpackStream(confProduction, webpack)
    .pipe(gulp.dest(`${conf.dest.build}/js`))
));
