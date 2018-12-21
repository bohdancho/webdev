var gulp         = require('gulp');
var watch        = require('gulp-watch');
var pump         = require('pump')
var autoprefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var sass         = require('gulp-sass');
var imagemin     = require('gulp-imagemin');
var browserSync  = require('browser-sync');
let cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

gulp.task('cssmin', () => {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});

gulp.task('htmlmin', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('build/js')
    ],
    cb
  );
});

gulp.task('default', ['htmlmin']);