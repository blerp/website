const del = require("del");
const execa = require("execa");
const gulp = require("gulp");
const run = require("gulp-run");
const babel = require("gulp-babel");

gulp.task("clean", () => del(["dist"]));

gulp.task("static", () =>
    gulp.src(["./src/static/**/*"]).pipe(gulp.dest("dist/static")),
);

gulp.task("noncode", () =>
    gulp
        // .src(["src/**/*.json", "src/**/*.markdown", ".babelrc", "next.config.js"])
        .src(["src/**/*.json", "src/**/*.markdown", ".babelrc"])
        .pipe(gulp.dest("dist")),
);

gulp.task("code", () =>
    gulp
        .src(["src/*.js", "src/**/*.js", "src/**/**/*.js", "src/**/**/**/*.js"])
        .pipe(babel())
        .pipe(gulp.dest("dist")),
);

gulp.task("next:build", () => run("npm run next:dist").exec());

gulp.task("next:export", () => run("npm run next:export").exec());

// gulp.task("next:copy-service-worker", () =>
//   gulp.src(["dist/.next/service-worker.js"]).pipe(gulp.dest("dist"))
// );

// gulp.task("next", gulp.series(["next:build", "next:copy-service-worker"]));

// gulp.task("next", gulp.series(["next:build"]));

gulp.task(
    "build",
    gulp.series([gulp.parallel(["noncode", "static", "code"]), "next:build"]),
);
