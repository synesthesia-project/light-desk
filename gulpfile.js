var util = require('@synesthesia-project/gulp-util');
var gulp = require('gulp');
var clean = require('gulp-clean');
var typedoc = require("gulp-typedoc");
var webpack = require('webpack');

util.cleanTask(['build', '.tmp']);

util.typescriptTasks({
  prefix: 'frontend-',
  tsconfig: 'src/frontend/tsconfig.json',
  outputDir: '.tmp/frontend/',
  tslintSrc: ['src/frontend/**/*.ts', 'src/frontend/**/*.tsx'],
  tslintConfig: 'tslint.json'
});

util.typescriptTasks({
  prefix: 'backend-',
  tsconfig: 'src/backend/tsconfig.json',
  outputDir: '.tmp/backend/',
  tslintSrc: ['src/backend/**/*.ts'],
  tslintConfig: 'tslint.json'
});

util.typescriptTasks({
  prefix: 'shared-',
  tsconfig: 'src/shared/tsconfig.json',
  outputDir: '.tmp/shared/',
  tslintSrc: ['src/shared/**/*.ts'],
  tslintConfig: 'tslint.json'
});

gulp.task("frontend-webpack", function(callback) {
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

gulp.task('backend-copy', function () {
    return gulp.src(['.tmp/backend/**/*']).pipe(gulp.dest('build/backend'));
});

gulp.task('shared-copy', function () {
    return gulp.src(['.tmp/shared/**/*']).pipe(gulp.dest('build/shared'));
});

gulp.task('frontend-audio-copy', function () {
    return gulp.src(['src/frontend/audio/**/*']).pipe(gulp.dest('build/frontend/audio'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel(
    'frontend-ts',
    'backend-ts',
    'shared-ts'
  ),
  gulp.parallel(
    'frontend-webpack',
    'backend-copy',
    'shared-copy',
    'frontend-audio-copy'
  )
));

gulp.task('tslint', gulp.series(
  gulp.parallel(
    'frontend-tslint',
    'backend-tslint',
    'shared-tslint'
  )
));

gulp.task('clean-docs', function () {
  return gulp.src(['docs/api'], { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('build-docs', function () {
  return gulp
    .src(['src/backend/**/*.ts'])
    .pipe(typedoc({
      readme: 'src/api-docs-readme.md',
      out: 'docs/api',
      name: 'API Reference - Synesthesia Project Light Desk',
      exclude: 'src/shared/**/*,src/backend/util/id-map.ts,src/backend/server.ts',
      // So that the generated output is consistent when the documentation hasn't changed, always use
      // 'master' as the branch, rather than the sha of the source that was used.
      gitRevision: 'develop',
      media: 'docs/media',
      tsconfig: 'src/backend/tsconfig.json'
    }));
});

gulp.task('docs', gulp.series('clean-docs', 'build-docs'));
