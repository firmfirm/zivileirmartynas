var gulp = require('gulp');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

gulp.task('watch:scripts', ['scripts'], browserSync.reload);
gulp.task('watch:styles', ['styles'], browserSync.reload);
gulp.task('watch:html', ['html'], browserSync.reload);
gulp.task('watch:images', ['images'], browserSync.reload);

gulp.task('default', ['build'], function() {

  // Serve files from the root of this project
    browserSync({
        notify: false,
        server: {
            baseDir: ".dist"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("src/scripts/*", ['watch:scripts']);
    gulp.watch("src/styles/*", ['watch:styles']);
    gulp.watch("src/images/*", ['watch:images']);
    gulp.watch("src/**/*.html", ['watch:html']);

});

gulp.task('dist:serve', ['dist:build'], function() {
  browserSync({
      notify: false,
      server: {
          baseDir: ".dist"
      }
  });
});

gulp.task('clean', function() {
  return gulp.src('.dist/!(images)/**/*', { read: false })
             .pipe($.clean());
});

var resizeTask = function(name, width) {
  gulp.task('images:' + name, function() {
    var dest = '.dist/images/' + name;
    return gulp.src('src/images/**/*')
               .pipe($.newer(dest))
               .pipe($.imageResize({
                  width: width
                }))
               .pipe(gulp.dest(dest));
  });
};
resizeTask('xxxlarge', 1800);
resizeTask('xxlarge', 1300);
resizeTask('xlarge', 1000);
resizeTask('large', 700);
resizeTask('medium', 300);
resizeTask('small', 200);
resizeTask('xsmall', 140);

gulp.task('images', function(cb) {
  runSequence(
    'images:xxxlarge',
    'images:xxlarge',
    'images:xlarge',
    'images:large',
    'images:medium',
    'images:small',
    'images:xsmall',
    cb);
});

gulp.task('styles', function() {
  return gulp.src(['src/styles/main.scss', 'src/styles/galerija.scss'])
             .pipe($.sass().on('error', $.sass.logError))
             .pipe($.autoprefixer())
             .pipe(gulp.dest('.dist/styles'));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
             .pipe(gulp.dest('.dist/scripts'));
});

gulp.task('vendor', function() {
  var files = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/GammaGallery/**/*'
  ];
  return gulp.src(files)
             .pipe(gulp.dest('.dist/vendor'));
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
             .pipe(gulp.dest('.dist'));
});

gulp.task('cname', function() {
  return gulp.src('src/CNAME')
             .pipe(gulp.dest('.dist'));
})

gulp.task('deploy', ['build', 'cname'], function() {
  return gulp.src('.dist/**/*')
             .pipe($.ghPages());
});

gulp.task('build', function(cb) {
  return runSequence(
    'clean',
    ['images', 'styles', 'scripts', 'vendor'],
    'html',
    cb
  );
});
