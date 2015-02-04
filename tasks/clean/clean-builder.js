module.exports = function(glob) {
    
    var options = {};
    options.glob = glob || ['build/**/*', 'jspm_packages/**', 'reports/**'];
    
    return function(gulp) {
        
        gulp.task('clean', function (cb) {
            var del = require('del');
            var gutil = require('gulp-util');
            
            del(options.glob, function (err) {
                gutil.log("Deleted " + options.glob);
                cb(err);
            });
        });
    }
}