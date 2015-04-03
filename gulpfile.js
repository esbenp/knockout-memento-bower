var gulp = require("gulp");
var umd = require("gulp-umd");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var concat = require("gulp-concat");

gulp.task("umd", function() {
    return gulp.src("src/**/*.js")
        .pipe(concat("knockout-memento-bower.js"))
        .pipe(umd({
            dependencies: function(file) {
                return [
                    {
                        name: "knockout",
                        amd: "knockout",
                        cjs: "knockout",
                        global: "ko",
                        param: "ko"
                    }
                ];
            },
            exports: function(file) {
                return 'ko';
            },
            namespace: function(file) {
                return 'ko';
            }
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("production", ["umd"], function(){
    return gulp.src(["dist/*.js", "!dist/*.min.js"])
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest("dist"))
});

gulp.task("dev", function(){
    return gulp.watch("src/**/*.js", ["umd"]);
});