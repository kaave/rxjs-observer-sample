const gulp = require('gulp');
const runSequence = require('run-sequence');

const conf = require('../config');

gulp.task('dev', cb => runSequence(
  'clean',
  'style',
  ['view', 'script'],
  'server',
  cb
));

gulp.task('default', ['dev'], () => {
  gulp.watch(conf.view.watch, ['view']);
  gulp.watch(conf.style.watch, ['style']);
  gulp.watch(conf.script.watch, ['script']);
});

gulp.task('build', cb => conf.rev.isEnable ?
  runSequence(
    'b.clean',
    'b.style',
    ['b.view', 'b.script'],
    Object.keys(conf.copy).map(key => `copy:${key}`),
    'rev',
    'rev.replace',
    cb
  ) :
  runSequence(
    'b.clean',
    'b.style',
    ['b.view', 'b.script'],
    Object.keys(conf.copy).map(key => `copy:${key}`),
    cb
  )
);