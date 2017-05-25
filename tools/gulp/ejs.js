import gulp from 'gulp';
import plumber from 'gulp-plumber';
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';
import minifyHtml from 'gulp-minify-html';
import browser from 'browser-sync';
import conf from '../config';

gulp.task('ejs', () => (
  gulp.src(conf.ejs.src)
    .pipe(plumber())
    .pipe(ejs(null, {}, { ext: '.html' }))
    .pipe(rename(conf.ejs.rename))
    .pipe(gulp.dest(conf.dest.dev))
    .pipe(browser.reload({stream: true}))
));

gulp.task('b.ejs', () => (
  gulp.src(conf.ejs.src)
    .pipe(ejs(null, {}, { ext: '.html' }))
    .pipe(minifyHtml())
    .pipe(rename(conf.ejs.rename))
    .pipe(gulp.dest(conf.dest.build))
));
