// Load gulp plugins with 'require' function of nodejs
var gulp    = require('gulp'),
plumber     = require('gulp-plumber'),
gutil       = require('gulp-util'),
uglify      = require('gulp-uglify'),
concat      = require('gulp-concat'),
rename      = require('gulp-rename'),
minifyCSS   = require('gulp-minify-css'),
less        = require('gulp-less'),
path        = require('path');

// Handle less error
var onError = function (err) {
  gutil.beep();
  console.log(err);
};

// Path configs
var appPathSrc = 'assets';

var css_files = appPathSrc + '/css/**/*.css', // .css files
    css_path  = appPathSrc + '/css', // .css path
    js_files  = appPathSrc + '/js/**/*.js', // .js files
    less_file = appPathSrc + '/less/style.less', // .less files
    less_path = appPathSrc + '/less/**/*.less',
    dist_path = appPathSrc + '/dist';

//Extension config
var extension = 'html';


/***** Functions for tasks *****/
function js() {
  return gulp.src(js_files)
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(concat('dist'))
      .pipe(rename('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest(dist_path));
}

function css() {
  return gulp.src(css_files)
      .pipe(concat('dist'))
      .pipe(rename('all.min.css'))
      .pipe(minifyCSS({keepBreaks:false, keepSpecialComments: false}))
      .pipe(gulp.dest(dist_path));
}

function lessTask(err) {
  return gulp.src(less_file)
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ] }))
      .pipe(gulp.dest(css_path));
}

// The 'js' task
gulp.task('js', function() {
  return js();
});

// The 'css' task
gulp.task('css', function(){
  return css();
});

// The 'less' task
gulp.task('less', function(){
  return lessTask();
});


// The 'default' task.
gulp.task('default', function() {
  gulp.watch(less_path, function() {
    return lessTask();
  });

  gulp.watch(css_files, function() {
    console.log('CSS task completed!');
    return css();
  });

  gulp.watch(js_files, function() {
    console.log('JS task completed!');
    return js();
  });
});
