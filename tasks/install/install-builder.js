var path = require('path');
var gutil = require('gulp-util');
var utils = require('../utils/utils');

module.exports = function(options) {
    
    return function(gulp) {
    
        gulp.task('generate-references', function (cb) {

            var outputFile = path.join(options.rootDir, '_references.d.ts');
            var writeRefs = require('./generate-references');
            var notify = require('../utils/notify');

            utils.ensureWriteFile(outputFile, lines, function(err) {
                if (err) {
                    notify.error(err);
                    throw err;
                }
                gutil.log('Generated ' + outputFile);
                cb();
            });


            var writeFile = function(rootDir, done) {
                writeRefs({ "fields": allfields, "root": rootDir }, function(lines, err) {
                    
                });                    
            };

            async.map(options.typescriptDirs, writeFile, cb);
        });

        gulp.task('install', ['generate-references']);
    }
}