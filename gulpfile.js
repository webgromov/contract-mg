const gulp 	  	= require('gulp'),
	 sass 	  	= require('gulp-sass'),
	 cleanCSS   	= require('gulp-clean-css'),
	 rename 	  	= require('gulp-rename'),
	 sourcemaps 	= require('gulp-sourcemaps'),
	 browserSync	= require('browser-sync'),
	 concat		= require('gulp-concat'),
	 uglify		= require('gulp-uglify-es').default

const globStyles = ['src/scss/*.scss', 'src/sass/*.sass'],
	 uncomprScripts = ['src/js/*.js', '!src/js/*.min.js']


gulp.task('styles', () => {
	return gulp.src(globStyles)
	.pipe(sass())
	.pipe(cleanCSS({degug: true}, details => {
		console.log(`${details.name}: ${details.stats.originalSize}`)
		console.log(`${details.name}: ${details.stats.minifiedSize}`)
	}))
	.pipe(rename({suffix: ".min"}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
	})

gulp.task('scripts', () => {
	return gulp.src(uncomprScripts)
	.pipe(uglify())
	.pipe(rename({suffix: ".min"}))
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.stream())
})

gulp.task('libs-css', () => {
	return gulp.src(['src/libs/bootstrap/dist/css/bootstrap.min.css', 'src/libs/slick/slick.css', 'src/libs/slick/slick-theme.css'])
	.pipe(concat('libs.min.css'))
	.pipe(cleanCSS())
	.pipe(gulp.dest('src/css'))
})
gulp.task('libs-js', () => {
	return gulp.src(['src/libs/jquery/dist/jquery.js', 'src/libs/slick/slick.js'])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'))
})


gulp.task('server', () => {
	browserSync.init({
		server: {baseDir: "src"}
	})
})



gulp.task('start', gulp.parallel('styles', 'scripts', 'server', () => {
	gulp.watch('src/scss/*.scss', gulp.series('styles'))
	gulp.watch(uncomprScripts, gulp.series('scripts'))
	gulp.watch('src/*.html').on('change', browserSync.reload)
}))

gulp.task('default', gulp.series('start'))