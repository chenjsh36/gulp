/*
	local install: npm install --save-dev gulp
	modules install: npm install --save-dev gulp-less gulp-autoprefixer gulp-minify-css gulp-jshint gulp-uglify gulp-imagemin gulp-rename gulp-clean gulp-concat gulp-notify gulp-cache browser-sync gulp-plumber gulp-coffee browserify througn2 node-glob vinyl-transform gulp-sourcemaps globby gulp-util reactify
	
 */

/*
	version：1.0
	待改进： 
		* 预编译语言
		* 路径分离 done
		* bower整合 done
    * browerify
		* 后台添加
    * 正则问题
 */
// 载入外挂
var gulp = require('gulp'),  
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    coffee = require('gulp-coffee'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    // livereload需要插件配合，换成browser-sync
    // livereload = require('gulp-livereload');
    browsersync = require('browser-sync'),
    // 使用browserify实现前后端模块加载
    // browserify = require('browserify'),
    browserify = require('gulp-browserify'),
    through2 = require('through2'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    transform = require('vinyl-transform'),
    sourcemaps = require('gulp-sourcemaps'),
    globby = require('globby'),
    gutil = require('gulp-util'),
    reactify = require('reactify'),
    // glob_ = require('node-glob')
    jade = require('gulp-jade')
    ;

var root = '';
var dist = 'dist';
// 文件发布路径
var paths = {
  views: {
    src: ['pages/**/*.html', 'pages/**/*.jade'],
    dest: root + dist + '/'
  },
  styles: {
    src: ['pages/**/*.css', 'pages/**/*.less'],
    dest: root + dist + '/pages'
  },
  scripts: {
    src: ['pages/**/*.js'],
    dest: root + dist + '/pages'
  },
  images: {
    src: 'pages/**/img/*',
    dest: root + dist + '/pages'
  },
  bower: {
    src: 'bower_components/*',
    dest: root + dist + '/bower_components'
  },
  modules: {
    src: ['modules/**/*.coffee'],
    dest: root + dist + '/modules'
  },
  widgets: {
    src: ['widgets/**'],
    dest: root + dist + '/widgets'
  },
  browserify: {
    src: ['pages/**/*.coffee'],
    dest: root + dist + '/pages'
  },
  clean: {
    src: root + dist + '/pages'
  },
  browsersync: {
    src: [dist + '/pages/**', dist + '/*.html', dist + '/widgets/slideshow/**']
    
  }
};

// 结构
gulp.task('views', function(){
  gulp.src(paths.views.src[0])
    .pipe(plumber())
    .pipe(rename(function(path){
      path.dirname = '';
    }))
    .pipe(gulp.dest(paths.views.dest))
    .pipe(notify({message: 'Views html task complete'}));
  return gulp.src(paths.views.src[1])
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(rename(function(path){
      path.dirname = '';
    }))
    .pipe(gulp.dest(paths.views.dest))
    .pipe(notify({message: 'Views jade task complete'}));


})

// 样式
gulp.task('styles', function() {  
  gulp.src(paths.styles.src[0])
    .pipe(plumber())
    .pipe(gulp.dest(paths.styles.dest));
  return gulp.src(paths.styles.src[1])
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(notify({ message: 'Styles task complete' }));
});

// modules 脚本
gulp.task('modules', function(){
  // return gulp.src(paths.modules.src)
    // .pipe(gulp.dest(paths.modules.dest))
  return gulp.src(paths.modules.src)
    .pipe(plumber())
    .pipe(coffee())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(paths.modules.dest))
    .pipe(notify({ message: 'modules task complete' }));
});

gulp.task('browserify', function() {
  return gulp.src(paths.browserify.src[0], {read: false})
    .pipe(plumber())
    .pipe(browserify({
      debug: true,
      transform: ['coffeeify'],
      extensions:['.coffee']
    }))
    .pipe(rename(function(path){
      path.extname = '.js'
    }))
    .pipe(gulp.dest('dist/pages'))
    .pipe(notify({message: 'Browserify task complete'}));
});

// 脚本
gulp.task('scripts', function() {      
  // .pipe(concat('main.js'))
  return gulp.src(paths.scripts.src[0])
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(paths.scripts.dest));
  // return gulp.src(paths.scripts.src)
  //   .pipe(plumber())
  //   .pipe(coffee())
  //   .pipe(jshint('.jshintrc'))
  //   .pipe(jshint.reporter('default'))
  //   .pipe(gulp.dest(paths.scripts.dest))
  //   .pipe(rename({ suffix: '.min' }))
  //   .pipe(uglify())
  //   .pipe(gulp.dest(paths.scripts.dest))
  //   .pipe(notify({ message: 'Scripts task complete' }));
});

// 图片
gulp.task('images', function() {  
  return gulp.src(paths.images.src)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(notify({ message: 'Images task complete' }));
});

// 依赖包
gulp.task('bower-update', function() {
  return gulp.src(paths.bower.src)
    .pipe(gulp.dest(paths.bower.dest))
    .pipe(notify({message: 'bower-update task complete'}));
});

gulp.task('widgets', function(){
  return gulp.src(paths.widgets.src)
    .pipe(gulp.dest(paths.widgets.dest));
})

// 清理
gulp.task('clean', function() {  
  return gulp.src([paths.clean.src], {read: false})
    .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function() {  
    gulp.start('modules', 'widgets', 'styles', 'scripts', 'browserify', 'images', 'views');
});

// 看手
gulp.task('watch', function() {

  // 看守所有.html挡
  gulp.watch(paths.views.src, ['views']);

  // 看守所有.less档
  gulp.watch(paths.styles.src, ['styles']);

  // 看守所有.js档
  gulp.watch(paths.scripts.src, ['scripts']);
  gulp.watch(paths.browserify.src, ['browserify']);

  // 看守所有图片档
  gulp.watch(paths.images.src, ['images']);


  // 查看widget
  gulp.watch(paths.widgets.src, ['widgets']);
  // 建立即时重整伺服器
  // var server = livereload({start: true});
  // livereload.listen();
  // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  // gulp.watch(['dist/**']).on('change', function(file) {
    // server.changed(file.path);
  // });

});

gulp.task('browser-sync', function() {
  var bs =browsersync.create();
  bs.init({
    files: paths.browsersync.src,
    server: {
      baseDir: 'dist'
    }
  });
	// browsersync({
	// 	files: 'dist/pages/**',
	// 	server: {
	// 		baseDir: 'dist'
	// 	}
	// });
});



//browserify node 版本
// return gulp.src('pages/**/*.js')
  //   .pipe(browserify())
  //   .pipe(gulp.dest('dist/pages'));

  // // gulp 希望任务能返回一个 stream，因此我们在这里创建一个
  // var bundledStream = through2();

  // bundledStream
  //   // 将输出的 stream 转化成为一个包含 gulp 插件所期许的一些属性的 stream
  //   .pipe(source('bundle.js'))
  //   // 剩下的部分，和你往常缩写的一样。
  //   // 这里我们直接拷贝 Browserify + Uglify2 范例的代码。
  //   .pipe(buffer())
  //   .pipe(sourcemaps.init({loadMaps: true}))
  //     // 在这里将相应 gulp 插件加入管道
  //     .pipe(uglify())
  //     .on('error', gutil.log)
  //   .pipe(sourcemaps.write('./'))
  //   .pipe(gulp.dest('./dist/pages/'));

  // // "globby" 替换了往常的 "gulp.src" 为 Browserify
  // // 创建的可读 stream。
  // globby(['./pages/**/*.js'], function(err, entries) {
  //   // 确保任何从 globby 发生的错误都被捕获到
  //   if (err) {
  //     bundledStream.emit('error', err);
  //     return;
  //   }

  //   // 创建 Browserify 实例
  //   var b = browserify({
  //     entries: entries,
  //     debug: true,
  //     transform: [reactify]
  //   });

  //   // 将 Browserify stream 接入到我们之前创建的 stream 中去
  //   // 这里是 gulp 式管道正式开始的地方
  //   b.bundle().pipe(bundledStream);
  // });

  // // 最后，我们返回这个 stream，这样 gulp 会知道什么时候这个任务会完成
  // return bundledStream;


  // var b = browserify({
  //   entries: "./pages/header/header.js",
  //   debug: true
  // });
  // return b.bundle()
  //     .pipe(source("header.js"))
  //     .pipe(buffer())
  //     .pipe(sourcemaps.init({loadMaps:true}))
  //     .pipe(sourcemaps.write("."))
  //     .pipe(gulp.dest("./dist/pages/header"))

  // 不再可以使用
  // var browserified = transform(function(filename) {
  //   var b = browserify(filename);
  //   return b.bundle();
  // });
  // // hello gulp.src() my old friend
  // return gulp.src(['./pages/header/header.js']) 
  //   .pipe(browserified)
  //   .pipe(uglify())
  //   .pipe(gulp.dest('./dist'));

  // return gulp.src('./pages/header/header.js')
  //   .pipe(through2.obj(function(file, enc, next) {
  //     browserify(file.path)
  //       .bundle(function(err, res) {
  //         err && console.log(err.stack);
  //         file.content = res;
  //         next(null, file);
  //       });
  //   }))
  //   .pipe(gulp.dest('./dist/pages/header'));

  // return browserify(['pages/header/header.js'])
  //   .bundle()
  //   .pipe(source('bundle.js'))
  //   .pipe(buffer())
  //   .pipe(gulp.dest('dist/pages/header/'));

  // glob_('./pages/header/header.js', {}, function(err, files) {
  //   var b = browserify();
  //   files.forEach(function(file) {
  //     b.add(file);
  //   });

  //   b.bundle()
  //     .pipe(source('output.js'))
  //     .pipe(buffer())
  //     .pipe(uglify())
  //     .pipe(gulp.dest('./dist'));
  //   cb();
  // });