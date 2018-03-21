'use scrict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const options =
{
    babel: { presets: ['env'], plugins: ['transform-object-rest-spread'] },
};

const config =
{
    js:
    {
        all:
        [
            'blog-posts.js',
            'projects.js',
        ],
        entryPoint: './resources/scripts/src/main/main.js',
        entryPoints: './resources/scripts/src/**/*.js',
        outputDirectory: './resources/scripts/',
        outputFile: 'bundle.js',
    },

    style:
    {
        entryPoint: './resources/style/sass/main/webstyle.scss',
        entryPoints: './resources/style/sass/**/*.scss',
        outputDirectory: './resources/style/css/'
    },
};

const logError = (error) => console.log(error);

gulp.task('js', () =>
{
    browserify(config.js.entryPoint)
        .bundle()
        .pipe(source(config.js.outputFile))
        .pipe(buffer())
        .pipe(babel(options.babel))
            .on('error', logError)
        .pipe(uglify())
            .on('error', logError)
        .pipe(gulp.dest(config.js.outputDirectory));
});

gulp.task('scripts', () =>
{
    config.js.all.forEach((file) =>
    {
        browserify(`./resources/scripts/src/pages/${file}`)
            .bundle()
            .pipe(source(`${file}`))
            .pipe(buffer())
            .pipe(babel(options.babel))
                .on('error', logError)
            .pipe(uglify())
                .on('error', logError)
            .pipe(gulp.dest('./resources/scripts/pages/'));
    });
});

gulp.task('sass', () =>
{
    gulp.src(config.style.entryPoint)
        .pipe(sass())
            .on('error', logError)
        .pipe(autoprefixer())
            .on('error', logError)
        .pipe(cleanCSS())
            .on('error', logError)
        .pipe(gulp.dest(config.style.outputDirectory));
});

gulp.task('watch-sass', () =>
{
    gulp.watch(config.style.entryPoints, ['sass']);
});

gulp.task('watch', () =>
{
    gulp.watch(config.style.entryPoints, ['sass']);
    gulp.watch(config.js.entryPoints, ['js']);
    gulp.watch(config.js.entryPoints, ['scripts']);
});

gulp.task('default', ['sass', 'js']);