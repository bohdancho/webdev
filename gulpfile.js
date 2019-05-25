const gulp             = require('gulp'),
      watch            = require('gulp-watch'),
      wait             = require('gulp-wait'),
			browserSync      = require("browser-sync"),
			rimraf           = require('rimraf'),
			rigger           = require('gulp-rigger'),
	    sass             = require('gulp-sass'),
			cleanCSS         = require('gulp-clean-css'),
			autoprefixer     = require('gulp-autoprefixer'),
	    imagemin         = require('gulp-imagemin'),
	    pngquant         = require('imagemin-pngquant'),
	    uglify           = require('gulp-uglify-es').default,
	    reload           = browserSync.reload;

const path = {
  dist: { 
    html: 'dist/',
    js: 'dist/js/',
    css: 'dist/css/',
    img: 'dist/img/',
    fonts: 'dist/fonts/'
  },
  src: { 
    html: 'src/*.html', 
    js: 'src/js/script.js',
    style: 'src/style/style.sass',
    img: 'src/img/**/*.*', 
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.sass',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './dist'
};

var config = {
  server: {
    baseDir: "./dist"
  },
  host: 'localhost',
  port: 3000,
  logPrefix: "Faugore"
};

gulp.task('html:dist', function (done) {
  gulp.src(path.src.html)
    // .pipe(rigger())
    .pipe(gulp.dest(path.dist.html))
    .pipe(reload({stream: true}));
  done();
});

gulp.task('js:dist', function (done) {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(uglify().on('error', function(uglify) {
        console.error(uglify.message);
        this.emit('end');
    }))
    .pipe(gulp.dest(path.dist.js))
    .pipe(reload({stream: true}));
  done();
});

gulp.task('style:dist', function (done) {
  gulp.src(path.src.style)
    .pipe(wait(500))
    .pipe(sass().on('error', sass.logError))
  	.pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({stream: true}));
  done();
});

gulp.task('image:dist', function (done) {
  gulp.src(path.src.img) 
    .pipe(imagemin({ 
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.dist.img))
    .pipe(reload({stream: true}));
  done();
});

gulp.task('fonts:dist', function(done) {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.dist.fonts))
  done();
});

gulp.task('dist', gulp.series('html:dist', 
															'js:dist',
														  'style:dist', 
														  'image:dist',
														  'fonts:dist'));

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('watch', function(){
	watch([path.watch.html], gulp.parallel('html:dist'));

  watch([path.watch.js], gulp.parallel('js:dist'));

  watch([path.watch.style], gulp.parallel('style:dist'));

  watch([path.watch.img], gulp.parallel('image:dist'));

  watch([path.watch.fonts], gulp.parallel('fonts:dist'));
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('default', gulp.parallel('dist', 'webserver', 'watch'));