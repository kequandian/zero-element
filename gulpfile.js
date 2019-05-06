const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpIgnore = require('gulp-ignore');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

gulp.task('babel', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
});

gulp.task('copy-css', function () {
  return gulp.src('./src/**/*.css').pipe(gulp.dest('./lib'));
});
gulp.task('copy-less', function () {
  return gulp.src('./src/**/*.less').pipe(gulp.dest('./lib'));
});
gulp.task('copy-png', function () {
  return gulp.src('./src/**/*.png').pipe(gulp.dest('./lib'));
});

const copyResources = gulp.parallel('copy-css', 'copy-less', 'copy-png');

gulp.task('concat-css', () => {
  return gulp.src('./src/**/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
  return gulp.src('./dist/index.css')
    .pipe(concat('index.min.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'));
});


gulp.task('default',
  gulp.series(
    'babel',
    copyResources,
    'concat-css',
    // 'minify-css'
  ));