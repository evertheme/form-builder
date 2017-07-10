var gulp = require('gulp');
var replace = require('gulp-replace');
var config = require('./gulp.config')();

var baseRef = new RegExp(config.baseRef, 'g');
var devSnapCssRegExp = new RegExp(config.devSnapCss, 'g');

gulp.task('pre-deploy', replaceBaseHref);
gulp.task('test-deploy', ['pre-deploy'], replaceTestSnapCSS);
gulp.task('qual-deploy', ['pre-deploy'], replaceQualSnapCSS);
gulp.task('ebt1-deploy', ['pre-deploy'], replaceEbt1SnapCSS);
gulp.task('prod-deploy', ['pre-deploy'], replaceProdSnapCSS);

function replaceBaseHref() {
    return gulp.src(config.buildIndex)
        .pipe(replace(baseRef, config.baseRefGlobal))
        .pipe(gulp.dest(config.build));
}

function replaceTestSnapCSS() {
    gulp.src(config.buildIndex)
        .pipe(replace(devSnapCssRegExp, config.testSnapCSS))
        .pipe(gulp.dest(config.build));
}

function replaceQualSnapCSS() {
    gulp.src(config.buildIndex)
        .pipe(replace(devSnapCssRegExp, config.qualSnapCSS))
        .pipe(gulp.dest(config.build));
}

function replaceEbt1SnapCSS() {
    gulp.src(config.buildIndex)
        .pipe(replace(devSnapCssRegExp, config.ebt1SnapCSS))
        .pipe(gulp.dest(config.build));
}

function replaceProdSnapCSS() {
    gulp.src(config.buildIndex)
        .pipe(replace(devSnapCssRegExp, config.prodSnapCSS))
        .pipe(gulp.dest(config.build));
}
