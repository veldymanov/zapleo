////////////////////////////////////////////////////
// Required
////////////////////////////////////////////////////
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),

    htmlmin = require('gulp-htmlmin'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),    
    webp = require('gulp-webp'),
	imagemin = require('gulp-imagemin'),

    browserSync = require('browser-sync'),
    reload = browserSync.reload, //for browser-sync
    del = require('del');
    

////////////////////////////////////////////////////
// HTML Task
////////////////////////////////////////////////////
//minify html
gulp.task('minify-html', function() {
    return gulp.src(['docs/**/*.dev.html'])
        .pipe(plumber())
        .pipe(rename(function(path) {
            path.basename = path.basename.replace(/.dev/, '');
            path.extname = ".php";
        }))
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            html5: true,
            minifyCSS: true,
            minifyJS: true,
            processConditionalComments: true,
            minifyURLs: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true
        }))
        .pipe(gulp.dest('docs/'));
});


////////////////////////////////////////////////////
// CSS Tasks 
////////////////////////////////////////////////////
//sass
gulp.task('sass', () =>
	gulp.src('docs/css/*.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('docs/css/'))
);

//minify css
gulp.task('minify-css', () =>
    gulp.src(['docs/css/**/*.css', '!docs/css/**/*.min.css'])
        .pipe(plumber())
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('docs/css/'))
);

////////////////////////////////////////////////////
// Script Tasks
////////////////////////////////////////////////////
//scripts
gulp.task('minify-scripts', function () {
    gulp.src(['docs/js/**/*.js', '!docs/js/**/*.min.js'])
        .pipe(plumber())
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('docs/js'))
        .pipe(reload({stream: true})); //for browser-sync
});


////////////////////////////////////////////////////
// Watch Tasks
////////////////////////////////////////////////////
gulp.task('watch', function () {
    gulp.watch('docs/**/*.dev.html', ['minify-html']);
    gulp.watch('docs/css/**/*.scss', ['sass']);
    gulp.watch(['docs/css/**/*.css', '!docs/css/**/*.min.css'], ['minify-css']);
    gulp.watch(['docs/js/**/*.js', '!docs/js/**/*.min.js'], ['minify-scripts']);
});

////////////////////////////////////////////////////
// Default Task
////////////////////////////////////////////////////
gulp.task('default', [
    'minify-html',
    'sass', 'minify-css',
    'minify-scripts',
    'watch'
]);