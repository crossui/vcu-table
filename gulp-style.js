const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const replace = require('gulp-replace-pro');
// 编译less
gulp.task('css', function () {
    gulp.src('../components/_style/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(replace('../iconfont/', './iconfont/'))
        .pipe(rename('vcu.css'))
        .pipe(gulp.dest('../dist/styles'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
    gulp.src('../components/_style/iconfont/*.*')
        .pipe(gulp.dest('../dist/styles/iconfont'));
});

gulp.task('default', ['css', 'fonts']);
