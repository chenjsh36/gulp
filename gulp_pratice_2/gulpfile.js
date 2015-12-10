/**
 * initial
 * local install: npm install --save-dev gulp gulp-less gulp-coffee gulp-uglify gulp-clean gulp-notify gulp-plumber browser0sync gulp-browserify gulp-jade gulp-rename gulp-watch gulp-filter run-sequence gulp-util gulp-coffeelint coffeelint-stylish gulp-htmlmin gulp-autoprefixer gulp-minify-css gulp-rev-collector
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
  stylish = require('coffeelint-stylish'),
  htmlmin = require('gulp-htmlmin'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  revcollect = require('gulp-rev-collector')
  ;

var browsersync_server = browsersync.create();
var reload = browsersync_server.reload;
/**
 * Gulp path initial
 */
// 顶级目录
var root = {
  src: 'src',
  dev: 'dev',
  dist: 'dist'
}
// 开发环境路径
var path = {
  views: {
    src: [root.src + '/pages/**/*.jade'],
    dev: root.dev + '/',
    dist: root.dist + '/'
  },
  styles: {
    src: [root.src + '/pages/**/*.less'],
    dev: root.dev + '/pages',
    dist: root.dist + '/pages'
  },
  scripts: {
    src: [root.src + '/**/**/*.coffee'],
    dev: root.dev + '',
    dist: root.dist + ''
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
// 打包环境路径

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
    .pipe(jade({pretty: true}))
    .pipe(rename(function(path){
      path.dirname = '';
    }))
    .pipe(gulp.dest(path.views.dev))
    .pipe(reload({stream: true}))
    .pipe(notify({message: 'Views jade task complete'}));
});


gulp.task('browserify_coffee', function(){
  return gulp.src(path.scripts.src, { read: false })
    .pipe(plumber())
    .pipe(coffeelint())
    .pipe(coffeelint.reporter(stylish))
    .pipe(browserify({
      debug: true,
      transform: ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe(rename(function(path){
      console.log('path is : ', path);
      path.extname = '.js'
    }))
    .pipe(gulp.dest(path.scripts.dev))
    .pipe(reload({stream: true}))
    .pipe(notify({message: 'Browserify_coffee task complete'}))
    ;
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
    .pipe(reload({stream: true}))
    .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('less', function() {
  return gulp.src(path.styles.src)
    .pipe(plumber())
    .pipe(gwatch(path.styles.src))
    .pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(path.styles.dev))
    .pipe(reload({stream: true}))
    .pipe(notify({message:'Less task complete'}));
});

gulp.task('clean', function() {
  return gulp.src([path.clean.src], {read: false})
    .pipe(clean());
});

gulp.task('watch', function(err){
  gwatch(root.src + '/**', function(event) {
    // console.log(event.name, event.verbose, event.base, event)
    if (event.event === 'unlink') {
      runsequence('clean',
                ['views', 'browserify_coffee', 'less']
        );
    }
  });
  gwatch(path.scripts.src, function(event) {
    if (event.event !== 'unlink') {
      runsequence('browserify_coffee');       
    }
  })

});

gulp.task('browsersync', function() {
  browsersync.init({
    files: module_path.browsersync.src,
    server: {
      baseDir: root.dev
    }
  });
});


gulp.task('default', ['clean', 'browsersync'], function(){
  return gulp.start('views', 'browserify_coffee', 'less', 'watch');
});


/**
 * build
 * 代码压缩
 */
gulp.task('clean:build', function(){
  return gulp.src([root.dist], {read: false})
    .pipe(clean());
});

gulp.task('minify', ['clean:build'], function(){
  gulp.src(path.views.dev + '/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.views.dist))
    .pipe(notify({message: 'Html minify task complete'}));

  gulp.src(path.scripts.dev + '/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(path.scripts.dist))
    .pipe(notify({message: 'Script minify task complete'}));

  gulp.src(path.styles.dev + '/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest(path.styles.dist))
    .pipe(notify({message: 'Style minify task complete'}));
});
