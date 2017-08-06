const gulp = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');

const conf = require('../config');

gulp.task('copy.roots', () => gulp.src(conf.copy.roots).pipe(gulp.dest(conf.dest.build)));
gulp.task('copy.assets', () => gulp.src(conf.copy.assets)
  .pipe(gulpif('*.{png,jpg,gif}', imagemin()))
  .pipe(gulp.dest(conf.dest.build))
);

