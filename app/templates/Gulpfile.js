'use strict';

const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const server = require('browser-sync').create();
const pug = require('gulp-pug');
const tinify = require('gulp-tinify');

const paths = {
  styles: {
    src: 'src/scss/*.scss',
    dest: 'dist/css/'
  },
  docs: {
    src: 'src/pug/*.pug',
    srcWatch: 'src/pug/**/*.pug',
    dest: 'dist/'
  },
  images: {
    src: 'src/img/*',
    dest: 'dist/img/'
  }
};

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: 'dist/'
    }
  });
  done();
}

function cssTranspile() {
	return src(paths.styles.src)
	  .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.styles.dest));
}

function imgTinify() {
  return src(paths.images.src)
    //.pipe(tinify('<%= tinifyAPIKey %>'))
    .pipe(dest(paths.images.dest));
}

function pugCompile() {
  return src(paths.docs.src)
    .pipe(pug())
    .pipe(dest(paths.docs.dest));
}

function cpLibElegantIcons() {
  return src('node_modules/elegant-icons/**/*')
    .pipe(dest('dist/lib/elegant-icons'));
}

function cpLibFlexBoxGrid() {
  return src('node_modules/flexboxgrid-sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/lib/flexboxgrid'));
}

function observe() {
  watch(paths.styles.src, series(cssTranspile, reload));
  watch(paths.docs.srcWatch, series(pugCompile, reload));
}

exports.build = series(
  parallel(
    cpLibElegantIcons,
    cpLibFlexBoxGrid),
  parallel(
    imgTinify,
    cssTranspile,
    pugCompile),
  serve,
  observe
);