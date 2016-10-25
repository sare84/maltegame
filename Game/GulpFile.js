var gulp = require("gulp"),
    rimraf = require("rimraf"),
    sequence = require("run-sequence"),
    mainBowerFiles = require("main-bower-files"),
    concat = require("gulp-concat"),
    order = require("gulp-order"),
    minifyCss = require("gulp-minify-css"),
    sourceMaps = require("gulp-sourcemaps"),
    templateCache = require("gulp-angular-templatecache"),
    ngAnnotate = require("gulp-ng-annotate"),
    uglify = require("gulp-uglify");

gulp.task("clean", function (callback) {
    rimraf("build", callback);
});

gulp.task("build-template-cache", function () {
    return gulp.src("src/app/**/*.html")
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest("build/scripts"));
});

gulp.task("copy-index", function () {
    return gulp.src("src/index.html")
        .pipe(gulp.dest("build"));
});


gulp.task("copy-languages", function(){
    return gulp.src("src/lang-*.json")
        .pipe(gulp.dest("build"));
});


gulp.task("copy-pics", function(){
    return gulp.src("src/app/assets/*")
        .pipe(gulp.dest("build/assets/"));
});

gulp.task("copy-fonts", function () {
    return gulp.src(["bower_components/admin-lte/bootstrap/fonts/**.*",
        "bower_components/font-awesome/fonts/**.*"])
        .pipe(gulp.dest("build/fonts"));
});

gulp.task("build-third-party-js", function () {
    return gulp.src(mainBowerFiles(["**/*.min.js"]))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest("build/scripts"));
});

gulp.task("build-third-party-css", function () {
    return gulp.src(mainBowerFiles(["**/*.css", "!**/*.min.css"]))
        .pipe(minifyCss({
            keepBreak: true,
            rebase: false,
            relativeTo: "./bower_components",
            target: "./bower_components"
        }))
        .pipe(concat("vendor.css"))
        .pipe(gulp.dest("build/styles"));
});

gulp.task("watch", function () {
    gulp.watch("src/**/*", ["build"]);
});

gulp.task("build-app-js", function(){
    return gulp.src(["src/**/*.js", "node_modules/angular-i18n/angular-locale_de-de.js"])
        .pipe(sourceMaps.init())
        .pipe(concat("app.js"))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest("build/scripts"));
});

gulp.task("build-app-css", function () {
    return gulp.src("src/app/styles/**/*.css")
        .pipe(concat("app.css"))
        .pipe(gulp.dest("build/styles"));
});

gulp.task("copy-assets", function () {
    gulp.src("assets/favicon.ico")
        .pipe(gulp.dest("build"));

    return gulp.src(["assets/**/*.png", "assets/**/*.jpg"])
        .pipe(gulp.dest("build/assets"));
});

gulp.task("build", function (cb) {
    return sequence("clean", [
        "copy-index",
        "copy-languages",
        //"copy-assets",
        "build-third-party-js",
        "build-third-party-css",
        "build-template-cache",
        "build-app-js",
        "build-app-css",
        "copy-fonts",
        "copy-pics"
    ], cb);
});

gulp.task("default", function () {
    return sequence("build", "watch");
});
