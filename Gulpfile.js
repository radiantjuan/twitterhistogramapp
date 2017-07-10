var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync').create();


gulp.task('jshint', function () {
    gulp.src([
        '!./app/*min.js',
        './app/assets/scripts/master.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('compile', function () {
    return gulp.src([ 
        '!./app/*min.js',
        './app/assets/scripts/master.js'
    ])
    .pipe(concat('master.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./app/assets/scripts/'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './app'
    },
  });
});

gulp.task('sass', function () {
  return gulp.src('./app/assets/styles/sass/master.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./app/assets/styles/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['jshint','compile','sass','browserSync'], function () {
   
    gulp.watch([
        '!./app/*min.js',
        './app/assets/scripts/*.js'
    ],['compile','jshint']);

    gulp.watch([
        './app/assets/styles/sass/*.scss'
    ],['sass']);

    gulp.watch('./app/**/*.html').on('change', browserSync.reload);


});

gulp.task( 'default', [ 'watch' ] );

