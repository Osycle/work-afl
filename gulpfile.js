


var gulp 					= require('gulp'),
	del							= require('del'),
	browserSync 		= require('browser-sync'),
	sass 						= require('gulp-sass'),
	concat					= require('gulp-concat'),
	uglify					= require('gulp-uglifyjs'),
	cssnano					= require('gulp-cssnano'),
	rename					= require('gulp-rename'),
	imagemin				= require('gulp-imagemin'),
	cache						= require('gulp-cache'),
	autoprefixer		= require('gulp-autoprefixer');
	
// OPTI-IMAGES
gulp.task('img', () =>
	gulp.src('app/img/**/*/')
		.pipe( cache(imagemin([
						imagemin.gifsicle({interlaced: true}),
						imagemin.jpegtran({progressive: true}),
						imagemin.optipng({optimizationLevel: 5}),
						imagemin.svgo({plugins: [{removeViewBox: true}]})
					])) )
		.pipe( gulp.dest('dist/img') )
);




// SASS
gulp.task('sass', () =>
	{
	return gulp.src( './app/sass/**/*.+(scss|sass)' )
			.pipe( sass().on('error', sass.logError) )
			.pipe( autoprefixer( {browsers: 'last 15 versions', cascade: false} ) )
			.pipe( gulp.dest('app/css/') ) // app/css default
			.pipe( browserSync.reload({stream:true}) );
	}
);



// SCRIPTS
gulp.task('scripts', () =>
	{	
	return gulp.src([
			'app/js/jquery.min.js',
			'app/js/smoothscroll.js',
			'app/js/bootstrap.js',
			'app/js/TweenMax.min.js',
			'app/js/EasePack.min.js',
			//'app/js/jquery.fractionslider.js',
			//'app/js/aos.js',
			//'app/js/owl.carousel.min.js',
			//'app/js/mo.min.js',
			'app/js/skrollr.min.js',
			'app/js/jquery.fancybox.js',
			'app/js/classie.js',
			'app/js/konva.min.js',
			'app/js/KonvaPlugin.js',
			'app/js/wow.js',
			'app/js/flickity.js'
		])
		.pipe( concat('scripts.min.js') )
		.pipe( uglify() )
		.pipe( gulp.dest('app/js/') ); //app/js default
	}
);

// STYLES
gulp.task('cssnano', ['sass'], () =>
	{
		return gulp.src('app/css/main.css')
		.pipe( cssnano({ reduceIdents :  false }) )
		.pipe(rename({suffix: '.min'}) )
		.pipe( gulp.dest('app/css/') ); // app/css default
	}
);

// RELOADER BROWSER
gulp.task('browser-sync', () =>
	{
		browserSync({
			server: {baseDir: 'app'},
			//proxy: "priming/app",
			notify: false
		});
	}
);

// CLEAN DIR
gulp.task('clean', () =>
	{ return del.sync( 'dist/' ); }
);
// CLEAR
gulp.task('clear', () => 
	{
		return cache.clearAll();
	} 
)

// WATCHING
gulp.task('watch', ['browser-sync', 'cssnano', 'scripts'], () =>
	{
		gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
		gulp.watch('app/*.html', browserSync.reload);
		gulp.watch('./**/*.php', browserSync.reload);
		gulp.watch('app/js/**/*.js', browserSync.reload);
	}
);



// PROD-BUILD
// this.array -> 'img' default
gulp.task('build', ['clean', 'cssnano', 'sass', 'scripts'], () =>

	{
		var css 	= gulp.src('app/css/main.min.css').pipe( gulp.dest( 'dist/css/' ) );
		var fonts 	= gulp.src('app/fonts/**/*').pipe( gulp.dest('dist/fonts/') );
		var js  	= gulp.src(['app/js/scripts.min.js', 'app/js/main.js']).pipe( gulp.dest('dist/js/') );
		var html 	= gulp.src('app/*.+(html|php)').pipe( gulp.dest('dist/') );
	}

);