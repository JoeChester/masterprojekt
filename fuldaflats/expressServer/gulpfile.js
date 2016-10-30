var gulp = require('gulp');
var clean = require('gulp-clean');
var copyNodeModule = require('copy-node-modules');

gulp.task('build', ['clean','copyNodeModules'], function () {
    gulp.src('./static.js')
        .pipe(gulp.dest('./dist'));
});

gulp.task("copyNodeModules", ['clean'], function () {
    copyNodeModule("./", "./dist/", { devDependencies: false }, function (err, results) {
        if (err) {
            console.error(err);
            return;
        }
        for (var i in results) {
            console.log('Copied package name:' + results[i].name + ' version:' + results[i].version);
        }
    });
});

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

