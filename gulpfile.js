// Load gulp plugins with 'require' function of nodejs
var gulp       = require('gulp'),
	gutil      = require('gulp-util'),
	uglify     = require('gulp-uglify'),
	concat     = require('gulp-concat'),
	rename     = require('gulp-rename'),
	minifyCSS  = require('gulp-minify-css'),
	less       = require('gulp-less'),
	path       = require('path'),
	lr         = require('tiny-lr'),
	livereload = require('gulp-livereload'),
	server     = lr();

// Path configs
var css_path  = 'assets/css/*.css', // .css files
	js_path   = 'assets/js/*.js', // .js files
	less_path = 'assets/less/style.less'; // .less files

// The 'js' task
gulp.task('js', function() {
gulp.src(js_path)
	.pipe(concat('dist'))
	.pipe(rename('concat.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/dist'))
	.pipe(livereload(server));
});

// The 'css' task
gulp.task('css', function(){
	gulp.src(css_path)
		.pipe(concat('dist'))
		.pipe(rename('all.min.css'))
		.pipe(minifyCSS(opts))
		.pipe(gulp.dest('assets/dist'))
		.pipe(livereload(server));
});

// The 'less' task
gulp.task('less', function(){
	gulp.src(less_path)
		.pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ] }))
		.pipe(gulp.dest('assets/css'))
		.pipe(livereload(server));
});

// Reload browser when have *.html changes
gulp.task('reload-browser', function() {
	gulp.src('*.html')
		.pipe(livereload(server));
});

// The 'watch' task
gulp.task('watch', function () {
	server.listen(35729, function (err) {
		if (err) return console.log(err);

		gulp.watch(less_path, function() {
			gulp.run('less');
		});

		gulp.watch(css_path, function() {
			gulp.run('css');
		});

		gulp.watch(js_path, function() {
			gulp.run('js');
		});

		gulp.watch('*.html', function(){
			gulp.run('reload-browser');
		});
	});
});


// The 'default' task.
gulp.task('default', function() {
	gulp.run('watch');
});
