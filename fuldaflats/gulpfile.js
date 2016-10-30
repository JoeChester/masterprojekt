var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('build', ['clean','buildClient','buildServer']);

gulp.task('buildClient',['clean'], function () {
    gulp.src('./angularClient/dist/**/*')
        .pipe(gulp.dest('./dist/app'));
});

gulp.task('buildServer',['clean'], function () {
    gulp.src('./expressServer/dist/**/*')
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

