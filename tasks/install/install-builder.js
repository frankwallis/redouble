var path = require('path');
var gutil = require('gulp-util');
var utils = require('../utils/utils');

module.exports = function(options) {

    options = options || {};
    options.rootDir = options.rootDir || process.cwd();

    return function(gulp) {

        gulp.task('generate-references', function (cb) {

            var outputFile = path.join(options.rootDir, '_references.d.ts');
            var writeRefs = require('./generate-references');
            var notify = require('../utils/notify');

            var lines = writeRefs(options);

            utils.ensureWriteFile(outputFile, lines, function(err) {
                if (err) {
                    notify.error(err);
                    throw err;
                }
                gutil.log('Generated ' + outputFile);
                cb();
            });
        });

        gulp.task('install', ['generate-references']);
    }
}
