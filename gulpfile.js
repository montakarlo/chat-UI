'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps');


sass.compiler = require('node-sass');
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream:true
    }));
});


gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: false
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch("./src/**/*.js").on('change', browserSync.reload);
  gulp.watch("./src/**/*.sass").on('change', browserSync.reload);
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.sass', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'))