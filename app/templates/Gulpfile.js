'use strict';

const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const server = require('browser-sync').create();
const pug = require('gulp-pug');
const tinify = require('gulp-tinify');

const paths = {
  styles: {
    src: 'src/scss/*.scss',
    dest: 'dist/css'
  },
  docs: {
    src: 'src/pug/*.pug',
    srcWatch: 'src/pug/**/*.pug',
    dest: 'dist'
  },
  scripts: {
    src: 'src/js/*',
    dest: 'dist/js'
  },
  images: {
    src: 'src/img/*',
    dest: 'dist/img'
  },
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

function transpileCss() {
	return src(paths.styles.src)
	  .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.styles.dest));
}

function tinifyImg() {
  return src(paths.images.src)
    .pipe(tinify('0Fd5wTMn0Rzfx5gSsp8v5dPXhC6cc27f'))
    .pipe(dest(paths.images.dest));
}

function compilePug() {
  return src(paths.docs.src)
    .pipe(pug())
    .pipe(dest(paths.docs.dest));
}

function minifyJs() {
  return src(paths.scripts.src)
    .pipe(dest(paths.scripts.dest));
}

function copyLogo() {
  return src('src/logo.svg')
    .pipe(dest('dist'));
}

function copyElegantIcons() {
  return src('node_modules/elegant-icons/**/*')
    .pipe(dest('dist/lib/elegant-icons'));
}

function observe() {
  watch(paths.styles.src, series(transpileCss, reload));
  watch(paths.docs.srcWatch, series(compilePug, reload));
  watch(paths.scripts.src, series(minifyJs, reload));
}

exports.build = series(
  parallel(
    copyLogo,
    copyElegantIcons,
    tinifyImg,
    transpileCss,
    minifyJs,
    compilePug),
  serve,
  observe
);