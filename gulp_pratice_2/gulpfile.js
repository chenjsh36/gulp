/**
 * initial
 * local install: npm install --save-dev gulp
 */

/**
 * Gulp module dependence
 */
var gulp = require('gulp'),
	less = require('gulp-less'),
	coffee = require('gulp-coffee'),
	uglify = require('gulp-uglify'),//js 压缩
	clean = require('gulp-clean'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	browsersync = require('browser-sync'),
	browserify = require('gulp-browserify'),
	jade = require('gulp-jade'),
	rename = require('gulp-rename'),
	gwatch = require('gulp-watch'),// 监听工具
	filter = require('gulp-filter'),// 过滤工具
	runsequence = require('run-sequence'),// 顺序执行工具
	gutil = require('gulp-util'),//打印工具
	coffeelint = require('gulp-coffeelint'),
	stylish = require('coffeelint-stylish')
	;

/**
 * Gulp path initial
 */
var root = {
	src: 'src',
	dev: 'dev',
	dist: 'dist'
}
var path = {
	views: {
		src: [root.src + '/pages/**/*.jade'],
		dev: root.dev + '/',
		dist: root.dist + '/'
	},
	less: {
		src: [root.src + '/pages/**/*.less'],
		dev: root.dev + '/pages',
		dist: root.dist + '/pages'
	},
	scripts: {
		src: [root.src + '/pages/**/*.coffee'],
		dev: root.dev + '/pages',
		dist: root.dist + '/pages'
	},
	images: {
		src: [root.src + '/pages/**/img/*'],
		dev: '/pages',
		dist: root.dist + '/pages'
	},
	clean: {
		src: root.dev
	}
}

var module_path = {
	browsersync: {
		src: [root.dev + '/pages/**', root.dev + '/*.html']
	},
	uglify: {
		sequences     : false,  // join consecutive statemets with the “comma operator”
		properties    : false,  // optimize property access: a["foo"] → a.foo
		dead_code     : false,  // discard unreachable code
		drop_debugger : false,  // discard “debugger” statements
		unsafe        : false, // some unsafe optimizations (see below)
		conditionals  : false,  // optimize if-s and conditional expressions
		comparisons   : false,  // optimize comparisons
		evaluate      : false,  // evaluate constant expressions
		booleans      : false,  // optimize boolean expressions
		loops         : false,  // optimize loops
		unused        : false,  // drop unused variables/functions
		hoist_funs    : false,  // hoist function declarations
		hoist_vars    : false, // hoist variable declarations
		if_return     : false,  // optimize if-s followed by return/continue
		join_vars     : false,  // join var declarations
		cascade       : false,  // try to cascade `right` into `left` in sequences
		side_effects  : false,  // drop side-effect-free statements
		warnings      : false,  // warn about potentially dangerous optimizations/code
		global_defs   : {}     // global definitions
	}
}


/**
 * Functoin initial
 */

function isDelete(file) {
	// event type: add unlink change
	return file.event === 'unlink';
}
function isNotDelete(file) {
	return file.event !== 'unlink';
}
var filter_del = filter(isDelete);
var filter_notdel = filter(isNotDelete);


/**
 * Gulp works
 */
gulp.task('views', function(){
	return gulp.src(path.views.src)
		.pipe(plumber())
		.pipe(gwatch(path.views.src))
		.pipe(filter_notdel)
		.pipe(jade({pretty: true}))
		.pipe(rename(function(path){
			path.dirname = '';
		}))
		.pipe(gulp.dest(path.views.dev))
		.pipe(notify({message: 'Views jade task complete'}));
});


gulp.task('validate_coffee', function() {
	return gulp.src(path.scripts.src)
		.pipe(plumber())
		.pipe(gwatch(path.scripts.src))
		.pipe(coffeelint())
		.pipe(coffeelint.reporter());
});
gulp.task('scripts', [], function(){
	return gulp.src(path.scripts.src)
		.pipe(gwatch(path.scripts.src))
		.pipe(plumber())
		.pipe(coffeelint())
		.pipe(coffeelint.reporter(stylish))
		.pipe(coffee())
		.pipe(gulp.dest(path.scripts.dev))
		.pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('less', function() {
	return gulp.src(path.less.src)
		.pipe(plumber())
		.pipe(gwatch(path.less.src))
		.pipe(less())
		.pipe(gulp.dest(path.less.dev))
		.pipe(notify({message:'Less task complete'}));
});

gulp.task('clean', function() {
	return gulp.src([path.clean.src], {read: false})
		.pipe(clean());
});


gulp.task('default', ['clean'], function(){
	return gulp.start('views', 'scripts', 'less', 'watch');
});

gulp.task('watch', function(err){
	return gwatch(root.src + '/**', function(event) {
		// console.log(event.name, event.verbose, event.base, event)
		if (event.event === 'unlink') {
			runsequence('clean',
								['views', 'scripts']
				);
		}
	});

	// gulp.src(path.views.src)
	// 	.pipe(gwatch(path.views.src))
	// 	.pipe(filter_del)
	// 	.pipe(rename(function(path_){
	// 		path_.dirname = '';
	// 	}))
	// 	.pipe(gulp.dest(path.views.dev))
	// 	.pipe(clean());
});

gulp.task('browsersync', function() {
	var bs = browsersync.create();
	bs.init({
		files: module_path.browsersync.src,
		server: {
			baseDir: root.dev
		}
	});
});