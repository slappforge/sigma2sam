const gulp = require('gulp');
const jshint = require('gulp-jshint');
const zip = require('gulp-zip');

gulp.task('lint', () => {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

// Zip up the source
gulp.task('zip', function() {
  const paths = [
    'PJ/*.js',
    'public/**',
    'node_modules/**'
  ];
  gulp.src(paths, { base: '.' })
    .pipe(zip('package.zip'))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['lint', 'zip']);