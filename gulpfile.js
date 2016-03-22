var gulp     = require('gulp'),
    less     = require('gulp-less'),
    cleancss = require('gulp-clean-css'),
    rename   = require('gulp-rename'),
    concat   = require('gulp-concat'),
    jshint   = require('gulp-jshint'),
    uglify   = require('gulp-uglify'),
    mocha    = require('gulp-mocha');

// Generates a CSS file based on the less file. It also creates a minified copy
gulp.task('css', function(){
    return gulp.src('./less/pager-tom.less')
        .pipe(less())
        .pipe(rename('pager-tom.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(cleancss({ 'keepSpecialComments':0 }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));
});

// Copies the JS file to the dist area.  Creates a minified version of it.
gulp.task('js', function(){
    return gulp.src('pager-tom.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));
});

// Runs the mocha test suite
gulp.task('test', function () {
    return gulp.src('./test/test.js')
        .pipe(mocha())
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});

// Default task
gulp.task('default', [], function() {
    gulp.start('css', 'js', 'test');
});

// Watch
gulp.task('watch', function() {
    // Watch .less files
    gulp.watch('./less/*.less', ['css']);

    // Watch .js files
    gulp.watch('./pager-tom.js', ['js', 'test']);
});
