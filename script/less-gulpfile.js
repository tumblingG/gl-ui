'use strict';

const { series, src, dest } = require('gulp');
const cssmin = require('gulp-cssmin');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['ie > 9', 'last 2 versions'] });

function compile() {
  return src('../src/theme-default/*.less')
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(cssmin())
    .pipe(dest('../lib/theme-default'));
}

exports.build = series(compile);
