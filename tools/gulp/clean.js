const gulp = require('gulp');
const rimraf = require('rimraf');

const conf = require('../config');

gulp.task('clean', cb => rimraf(conf.dest.dev, {}, cb));
gulp.task('b.clean', cb => rimraf(conf.dest.build, {}, cb));

