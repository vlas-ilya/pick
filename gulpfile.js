var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    include = require('gulp-include'),
    jasmine = require('gulp-jasmine'),
    clean = require('gulp-clean');

gulp.task('build', function () {
    return gulp.src(['./src/pick.js'])
    .pipe(include())
    .pipe(uglify())
    .pipe(gulp.dest('./build/pick/'));
});

gulp.task('copyTestFiles', function () {
    return gulp.src(['./src/lib.js', './test/tests.js'])
    .pipe(gulp.dest('./build/tmp/files'));
});

gulp.task('buildTestFiles', function () {
    return gulp.src(['./build/tmp/files/tests.js'])
    .pipe(include())
    .pipe(gulp.dest('./build/tmp/'));
})

gulp.task('testing', function () {
    return gulp.src(['./build/tmp/tests.js'])
    .pipe(jasmine());
});

gulp.task('clear', function () {
    return gulp.src('build/*', {read: false})
    .pipe(clean());
});
