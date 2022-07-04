import browserSync from "browser-sync";
import del from "del";
import gulp from "gulp";
import babel from "gulp-babel";
import cache from "gulp-cache";
import cssnano from "gulp-cssnano";
import imagemin, { gifsicle, mozjpeg, optipng } from "gulp-imagemin";
import include from "gulp-include";
import fileInclude from "gulp-file-include";
import notify from "gulp-notify";
import pngquant from "gulp-pngquant";
import gulpSccs from "gulp-sass";
import uglify from "gulp-uglify";
import wait from "gulp-wait";
import webp from "gulp-webp";
import nodeSass from "node-sass";
import webpack from "webpack-stream";
const sass = gulpSccs(nodeSass);

const wpConfig = {
    output: {
        path: "/js/",
        filename: "app.js",
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx?$/g,
                loader: "babel",
                query: {
                    presets: ["es2015", "react"],
                },
            },
        ],
    },
};

gulp.task("webpackRun", function (callback) {
    let options = {
        mode: "production",
        entry: {
            "main.min": "./app/js/app.js",
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
        output: {
            libraryTarget: "var",
            library: "sliderGlob",
            filename: "[name].js",
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /^_(\w+)(\.js)$|node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor.min",
                    },
                },
            },
            minimize: false,
            minimizer: [],
        },
        plugins: [],
    };

    return gulp.src("app/js/app.js").pipe(webpack(options)).pipe(gulp.dest("dist/js/webpack"));
});
gulp.task("file", function (callback) {
    return gulp.src("app/file/*.*").pipe(gulp.dest("dist/file"));
});

gulp.task("sass", function () {
    // Создаем таск Sass
    return gulp
        .src(["app/sass/**/*.scss", "app/html_blocks/**/*.scss"]) // Берем источник
        .pipe(wait(200))
        .pipe(sass().on("error", notify.onError())) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest("app/css")) // Выгружаем результат в папку app/css
        .pipe(
            cssnano({
                autoprefixer: {
                    browsers: ["last 15 versions", "> 1%"],
                    add: true,
                },
            })
        )
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({ stream: true })); // Обновляем CSS на странице при изменении
});

gulp.task("webP", function () {
    return gulp.src("app/pic/**/*.{jpg,jpeg,png}").pipe(webp()).pipe(gulp.dest("dist/pic")); // Выгружаем на продакшен
});
gulp.task("watch", function () {
    // Создаем таск browser-sync
    browserSync({
        // Выполняем browserSync
        server: {
            // Определяем параметры сервера
            baseDir: "dist", // Директория для сервера - app
            directory: true, // Смотрим все файлы в директории
        },
        notify: true, // Отключаем уведомления
    });

    gulp.watch(["app/sass/**/*.scss", "app/html_blocks/**/*.scss"], gulp.parallel("sass"));
    gulp.watch(["app/js/**/*.js", "app/html_blocks/**/*.js", "app/js/pages/*.js", "!app/js/libs/**"], function (done) {
        gulp.src(["app/js/**/*.js", "app/html_blocks/**/*.js", "app/js/pages/*.js", "!app/js/libs/**"]) // Переносим скрипты в продакшен

            .pipe(
                fileInclude({
                    prefix: "// @@",
                    basepath: "./app/",
                })
            )
            .pipe(
                babel({
                    presets: ["@babel/preset-env"],
                })
            )
            .pipe(uglify())
            .pipe(gulp.dest("dist/js"))
            .pipe(browserSync.reload({ stream: true }));
        done();
    });

    gulp.watch("app/**/*.html", function (done) {
        gulp.src("app/**/*.html")
            .pipe(
                fileInclude({
                    prefix: "@@",
                    basepath: "@file",
                })
            )
            .pipe(gulp.dest("dist"))
            .pipe(browserSync.reload({ stream: true }));
        done();
    });
});

gulp.task("clean", function () {
    return del.sync("dist"); // Удаляем папку dist перед сборкой
});
gulp.task("png", function () {
    return gulp
        .src("app/pic/**/*.png")
        .pipe(
            pngquant({
                quality: "65-80",
            })
        )
        .pipe(gulp.dest("dist/pic")); // Выгружаем на продакшен
});

gulp.task("img", function () {
    return gulp
        .src("app/pic/**/*.{svg,gif,jpg,jpeg}") // Берем все изображения из app
        .pipe(
            imagemin([gifsicle({ interlaced: true }), mozjpeg({ quality: 75, progressive: true }), optipng({ optimizationLevel: 5 })], {
                verbose: true,
            })
        )
        .pipe(gulp.dest("dist/pic")); // Выгружаем на продакшен
});
gulp.task("img_all", gulp.parallel("webP", "img", "png"));

gulp.task("build", function () {
    var scss = gulp
        .src(["app/sass/**/*.scss", "app/html_blocks/**/*.scss"]) // Берем источник
        .pipe(wait(200))
        .pipe(sass().on("error", notify.onError())) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest("app/css")) // Выгружаем результат в папку app/css
        .pipe(
            cssnano({
                autoprefixer: {
                    browsers: ["last 15 versions", "> 1%", "ie 8", "ie 7"],
                    add: true,
                },
            })
        )
        .pipe(gulp.dest("dist/css"));
    var buildCSS = gulp
        .src("app/css/**/*") // Переносим CSS в продакшен
        .pipe(
            cssnano({
                autoprefixer: {
                    browsers: ["last 15 versions", "> 1%", "ie 8", "ie 7"],
                    add: true,
                },
            })
        )
        .pipe(gulp.dest("dist/css"));

    var buildFonts = gulp
        .src("app/fonts/**/*") // Переносим шрифты в продакшен
        .pipe(gulp.dest("dist/fonts"));

    var buildVideo = gulp
        .src("app/video/**/*") // Переносим видео в продакшен
        .pipe(gulp.dest("dist/video"));

    var buildJs = gulp
        .src(["app/js/**/*.js", "app/html_blocks/**/*.js", "app/js/pages/*.js", "!app/js/libs/**"]) // Переносим скрипты в продакшен
        .pipe(
            fileInclude({
                prefix: "// @@",
                basepath: "./app/",
            })
        )
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));

    var buildHtml = gulp
        .src("app/*.html") // Переносим HTML в продакшен
        .pipe(
            fileInclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(gulp.dest("dist"));

    var buildJSON = gulp
        .src("app/*.json") // Переносим JSON в продакшен
        .pipe(gulp.dest("dist"));
    // gulp.parallel('webpack');
    return cache.clearAll();
});

gulp.task("default", gulp.parallel("watch"));
