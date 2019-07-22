'use strict';

const { series, parallel } = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');

function cssTranspile() {
	return src('src/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'));
}

function pugCompile() {
  return src('src/pug/*.pug', {allowEmpty: true})
    .pipe(pug())
    .pipe(dest('dist'));
}

function publish() {
  browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
}

exports.build = series(
  cssTranspile,
  pugCompile,
  publish
);