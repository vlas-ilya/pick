var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    include = require('gulp-include'),
    jasmine = require('gulp-jasmine'),
    clean = require('gulp-clean'),
    rename = require("gulp-rename");

gulp.task('clear', function (cb) {
    return gulp.src(['build/', 'export/'], {read: false})
    .pipe(clean());
    cb(err);
});

gulp.task('export', ['export-min'], function () {
    return gulp.src(['./src/pick.js'])
    .pipe(include())
    .pipe(gulp.dest('./export/'));
});

gulp.task('export-min', function (cb) {
    return gulp.src(['./src/pick.js'])
    .pipe(include())
    .pipe(uglify())
    .pipe(rename("./pick.min.js"))
    .pipe(gulp.dest('./export/'));
    cb(err);
});

gulp.task('angular-min', function (cb) {
    return gulp.src(['./src/angular.js'])
    .pipe(rename("./pick.min.js"))
    .pipe(include())
    .pipe(uglify())
    .pipe(gulp.dest('./export/angular/'));
    cb(err);
});

gulp.task('angular', ['angular-min'], function () {
    return gulp.src(['./src/angular.js'])
    .pipe(include())
    .pipe(rename("./pick.js"))
    .pipe(gulp.dest('./export/angular/'));
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

