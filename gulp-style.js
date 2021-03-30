const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
// 编译less
gulp.task('css', function () {
    gulp.src('./components/styles/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename('vcu-table.css'))
        .pipe(gulp.dest('./dist'));
});



gulp.task('default', ['css']);
