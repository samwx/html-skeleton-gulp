// Load gulp plugins with 'require' function of nodejs
var gulp    = require('gulp'),
plumber     = require('gulp-plumber'),
gutil       = require('gulp-util'),
uglify      = require('gulp-uglify'),
concat      = require('gulp-concat'),
rename      = require('gulp-rename'),
minifyCSS   = require('gulp-minify-css'),
less        = require('gulp-less'),
imagemin    = require('gulp-imagemin');
clean       = require('gulp-clean');
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
    img_path = appPathSrc + '/img';
    img_files = appPathSrc + '/src/img/**/*';
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
      .pipe(rename('concat.min.js'))
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

function imageTask() {
  cleanImg();
  return gulp.src(img_files)
    .pipe(imagemin())
    .pipe(imagemin())
    .pipe(gulp.dest(img_path));
}

function cleanImg(){
  return gulp.src(img_path, { read: false, force: true })
    .pipe(clean());
}

function getTime(){
  var currentdate = new Date();

  var datetime = "Last Sync: " + currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

  return datetime;
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

// The 'img' task
gulp.task('img', function(){
  return imageTask();
});

// The 'clean' task
gulp.task('clean-imgs', function(){
  return cleanImg();
});

// The 'default' task.
gulp.task('default', function() {
  gulp.watch(less_path, function () {
    console.log('Less task completed! ' + getTime());
    return lessTask();
  });

  gulp.watch(css_files, function() {
    console.log('CSS task completed! ' + getTime());
    return css();
  });

  gulp.watch(js_files, function() {
    console.log('JS task completed! ' + getTime());
    return js();
  });

  gulp.watch(img_files, function() {
    console.log('IMG task completed! ' + getTime());
    return imageTask();
  });
});
