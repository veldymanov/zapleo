////////////////////////////////////////////////////
// Required
////////////////////////////////////////////////////
let gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),

    critical = require('critical').stream,
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    webp = require('gulp-webp'),
    imagemin = require('gulp-imagemin'),

    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del');


////////////////////////////////////////////////////
// HTML Task
////////////////////////////////////////////////////
//update browser-sync
gulp.task('html', function() {
    return gulp.src(['src/**/*.html'])
        .pipe(reload({stream: true}));
});

////////////////////////////////////////////////////
// CSS Tasks
////////////////////////////////////////////////////
//run sass
gulp.task('sass', () =>
    gulp.src('src/**/*.scss')
    	.pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/'))
);

//update browser-sync
gulp.task('css', () =>
    gulp.src(['src/**/*.css'])
        .pipe(reload({stream: true}))
);


////////////////////////////////////////////////////
// Script Tasks
////////////////////////////////////////////////////
//update browser-sync
gulp.task('scripts', function () {
    gulp.src(['src/**/*.js'])
        .pipe(reload({stream: true}));
});


////////////////////////////////////////////////////
// Picture tasks
////////////////////////////////////////////////////
//pctures minimize to '*.opt.{png,jpg,gif,svg}' and '*.z.{png,jpg,gif,svg}'
gulp.task('pic:min', () =>
    gulp.src([
        'src/**/images/**/*.{png,jpg,gif,svg}',
        '!src/**/images/**/*.opt.{png,jpg,gif,svg}',
        '!src/**/images/**/*.z.{png,jpg,gif,svg}'
    ])
        .pipe(rename({suffix: '.opt'}))
        .pipe(imagemin())
        .pipe(gulp.dest('src/'))
        .pipe(rename(function(opt) {
            opt.basename = opt.basename.replace(/.opt/, '.z');
        }))
        .pipe(gulp.dest('src/'))
);

//create '*.z.webp' from '*.opt.{png,jpg}'
gulp.task('pic:webp', ['pic:min'], () =>
    gulp.src(['src/**/images/**/*.opt.{jpg,png}'])
        .pipe(rename(function(opt) {
            opt.basename = opt.basename.replace(/.opt/, '.z');
        }))
        .pipe(webp())
        .pipe(gulp.dest('src/'))
);

//remove all pictures exept 'src/images/**/*.z.{png,jpg,gif,svg}'
gulp.task('pic:remove', ['pic:webp'], function () {
    del.sync([
        'src/**/images/**/*.{png,jpg,gif,svg}',
        '!src/**/images/**/*.z.{png,jpg,gif,svg}'
    ]);
});

gulp.task('pic', ['pic:remove']);

////////////////////////////////////////////////////
// Build Task (production version)
////////////////////////////////////////////////////
//clear out all files and folders from build folder
gulp.task('build:cleanfolder', function () {
    del.sync('docs/**');
});

//task to create build directory for all files
gulp.task('build:copy', ['build:cleanfolder'], function () {
    return gulp.src('src/**/*/')
        .pipe(gulp.dest('docs/'));
});


// Generate & Inline Critical-path CSS
gulp.task('critical', ['build:copy'], function () {
    return gulp.src('docs/*.html')
        .pipe(critical({
            base: 'docs/', 
            inline: true, 
            minify: true
        }))
        .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
        .pipe(gulp.dest('docs/'));
});

//minify html (skipped)
gulp.task('html:minify', ['critical'], function() {
    return gulp.src(['docs/**/*.html'])
        .pipe(plumber())
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

//minify css
gulp.task('css:minify', ['critical'], function () {
    gulp.src(['docs/**/*.css'])
        .pipe(plumber())
        .pipe(cleanCSS())
        .pipe(gulp.dest('docs/'));
});

//minify scripts
gulp.task('scripts:minify', ['css:minify'], function () {
    gulp.src(['docs/**/*.js'])
        .pipe(plumber())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('docs/'));
});

//task to remove unwanted build files
//list all files and directories here that you don't want to include
gulp.task('build:remove', ['scripts:minify'], function () {
    del.sync(['docs/**/*.scss']);
});

gulp.task('build', ['build:remove']);

////////////////////////////////////////////////////
// Browser-Sync Tasks
////////////////////////////////////////////////////
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './src/'
        }
    });
});

//task to run build server
gulp.task('build:server', function () {
    browserSync({
        server: {
            baseDir: './docs/'
        }
    });
});

////////////////////////////////////////////////////
// Watch Tasks
////////////////////////////////////////////////////
gulp.task('watch', function () {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch('src/**/*.js', ['scripts']);
});

////////////////////////////////////////////////////
// Default Task
////////////////////////////////////////////////////
gulp.task('default', [
    'html',
    'sass', 'css',
    'scripts',
    'browser-sync',
    'watch'
]);