var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    include = require('gulp-include'),
    jasmine = require('gulp-jasmine'),
    clean = require('gulp-clean');

gulp.task('clear', function (cb) {
    return gulp.src(['build/', 'export/'], {read: false})
    .pipe(clean());
    cb(err);
});

gulp.task('build', ['clear'], function () {
    return gulp.src(['./src/pick.js'])
    .pipe(include())
    .pipe(gulp.dest('./build/pick/'));
});

gulp.task('export', function () {
    return gulp.src(['./src/pick.js'])
    .pipe(include())
    .pipe(uglify())
    .pipe(gulp.dest('./export/'));
});

gulp.task('copyTestFiles', ['clear'], function (cb) {
    return gulp.src(['./src/lib.js', './test/tests.js'])
    .pipe(gulp.dest('./build/tests/files'));
    cb(err);
});

gulp.task('buildTestFiles', ['copyTestFiles'], function (cb) {
    return gulp.src(['./build/tests/files/tests.js'])
    .pipe(include())
    .pipe(gulp.dest('./build/tests/'));
    cb(err);
})

gulp.task('testing', ['buildTestFiles'], function (cb) {
    return gulp.src(['./build/tests/tests.js'])
    .pipe(jasmine());
    cb(err);
});

gulp.task('test', ['testing'], function () {
    gulp.start('clear');
});

gulp.task('angular', ['clear'], function () {
    return gulp.src(['./src/angular.js'])
    .pipe(include())
    .pipe(gulp.dest('./build/pick/'));
});

gulp.task('angular-export', function () {
    return gulp.src(['./src/angular.js'])
    .pipe(include())
    .pipe(uglify())
    .pipe(gulp.dest('./export/pick/angular/'));
});