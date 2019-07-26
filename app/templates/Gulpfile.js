'use strict';

const { series, parallel } = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const tinify = require('gulp-tinify');

function cpLibElegantIcons() {
  return src('node_modules/elegant-icons/**/*')
    .pipe(dest('dist/lib/elegant-icons'));
}

function cpLibFlexBoxGrid() {
  return src('node_modules/flexboxgrid-sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/lib/flexboxgrid'));
}

function cssTranspile() {
	return src('src/scss/*.scss')
	  .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'));
}

function imgTinify() {
  return src('src/img/*')
    //.pipe(tinify('<%= tinifyAPIKey %>'))
    .pipe(dest('dist/img'));
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
  cpLibElegantIcons,
  cpLibFlexBoxGrid,
  imgTinify,
  parallel(
    cssTranspile,
    pugCompile),
  publish
);