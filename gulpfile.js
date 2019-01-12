var gulp = require('gulp');
var clean = require('gulp-clean');
var gutil = require("gulp-util");
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var typedoc = require("gulp-typedoc");

var frontendTsProject = ts.createProject('src/frontend/tsconfig.json');
var backendTsProject = ts.createProject('src/backend/tsconfig.json');
var sharedTsProject = ts.createProject('src/shared/tsconfig.json');

// Utility Functions

function handleError(err) {
  gutil.log("Build failed", err.message);
  process.exit(1);
}

gulp.task('clean', function() {
  return gulp.src(['build', '.tmp'], {read: false})
        .pipe(clean());
});

gulp.task('frontend-ts', function () {
    return frontendTsProject.src()
      .pipe(frontendTsProject())
      .on('error', handleError)
      .pipe(gulp.dest('.tmp/frontend/'));
});

gulp.task('backend-ts', function () {
    return backendTsProject.src()
      .pipe(backendTsProject())
      .on('error', handleError)
      .pipe(gulp.dest('.tmp/backend/'));
});

gulp.task('shared-ts', function () {
    return sharedTsProject.src()
      .pipe(sharedTsProject())
      .on('error', handleError)
      .pipe(gulp.dest('.tmp/shared/'));
});

gulp.task('tslint', function() {
  return gulp.src(['src/**/*.ts'])
  .pipe(tslint({
    formatter: 'verbose',
    configuration: 'tslint.json'
  }))
  .on('error', handleError)
  .pipe(tslint.report());
});

gulp.task("frontend-webpack", ['frontend-ts'], function(callback) {
    // run webpack
    webpack({
        entry: {
          bundle: "./.tmp/frontend/main.js",
        },
        output: {
            filename: "[name].js",
            path: __dirname + "/build/frontend"
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        module: {
            preLoaders: [
                { test: /\.js$/, loader: "source-map" }
            ]
        },
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        callback();
    });
});

gulp.task('backend-copy', ['backend-ts'], function () {
    return gulp.src(['.tmp/backend/**/*']).pipe(gulp.dest('build/backend'));
});

gulp.task('shared-copy', ['shared-ts'], function () {
    return gulp.src(['.tmp/shared/**/*']).pipe(gulp.dest('build/shared'));
});

gulp.task('frontend-audio-copy', ['shared-ts'], function () {
    return gulp.src(['src/frontend/audio/**/*']).pipe(gulp.dest('build/frontend/audio'));
});

gulp.task('clean-docs', function() {
  return gulp.src(['docs/api'], {read: false})
        .pipe(clean());
});

gulp.task('docs', ['clean-docs'], function() {
  return gulp
    .src(['src/backend/**/*.ts'])
    .pipe(typedoc({
        readme: 'src/api-docs-readme.md',
        module: 'commonjs',
        target: 'es6',
        out: 'docs/api',
        name: 'API Reference - Synesthesia Project Light Desk',
        exclude: 'src/shared/**/*,src/backend/util/id-map.ts,src/backend/server.ts',
        // So that the generated output is consistent when the documentation hasn't changed, always use
        // 'master' as the branch, rather than the sha of the source that was used.
        gitRevision: 'master',
        media: 'docs/media'
    }));
});

gulp.task('default', function(callback) {
  runSequence(
    'clean',
    ['frontend-webpack', 'frontend-audio-copy', 'backend-copy', 'shared-copy'],
    'tslint',
    callback);
});
