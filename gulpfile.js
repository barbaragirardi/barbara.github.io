// Define variables to the GulpJS and your GulpJS installed plugins
var gulp    = require('gulp'),
minifycss   = require('gulp-minify-css'),
uglify      = require('gulp-uglify'),
imagemin    = require('gulp-imagemin'),
concat      = require('gulp-concat'),
livereload  = require('gulp-livereload'),
uncss       = require('gulp-uncss');

// Make the tasks using the plugins installed

// Styles tasks
gulp.task('styles', function() {
  gulp.src('Source/assets/css/*.css')
  .pipe(uncss({
    html: ['index.html'],
    ignore: [
            ".navbar-shrink",
            ".fade",
            ".fade.in",
            ".collapse",
            ".collapse.in",
            ".collapsing",
            ".active",
            /\.open/,
            /\.navbar-shrink/,
            /\.active/
       ]
  }))
  .pipe(minifycss())
  .pipe(concat('main.css'))
  .pipe(gulp.dest('Production/assets/css/'))
  .pipe(livereload());
});

// Scripts tasks
gulp.task('scripts', function() {
  gulp.src(
    [
      'Source/assets/javascript/jquery.js',
      'Source/assets/javascript/jquery.easing.js',
      'Source/assets/javascript/bootstrap.js',
      'Source/assets/javascript/cbpAnimatedHeader.js',
      'Source/assets/javascript/classie.js',
      'Source/assets/javascript/main.js'
    ]
  )
  .pipe(uglify())
  .pipe(concat('main.js'))
  .pipe(gulp.dest('Production/assets/javascript/'))
  .pipe(livereload());
});

// Images tasks
gulp.task('img', function() {
  gulp.src('Source/assets/images/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('Production/assets/images/'))
  .pipe(livereload());
});

// Fonts tasks
gulp.task('fonts', function () {
  gulp.src('Source/assets/fonts/**/*')
  .pipe(gulp.dest('Production/assets/fonts/'))
  .pipe(livereload());
});

// Watch task
gulp.task('watch', function() {
  var server = livereload();
  gulp.watch('Source/assets/css/*.css', ['styles']);
  gulp.watch('Source/assets/javascript/*.js', ['scripts']);
  gulp.watch('Source/assets/images/*', ['img']);
});

// The task that you've named of 'default' (like the one bellow), will run with the command: gulp

// Default task
gulp.task('default', ['styles', 'scripts', 'img', 'fonts', 'watch']);