var gutil = require('gulp-util');

module.exports = function(options) {
    
    return function(gulp) {
    
        gulp.task('generate-references', ['install-components'], function (cb) {
            var writeRefs = require('./generate-references');
            var utils = require('../utils/utils');
            var async = require('async');
            var notify = require('../utils/notify');
            var path = require('path');

            var writeFile = function(rootDir, done) {
                writeRefs({ "fields": allfields, "root": rootDir }, function(lines, err) {
                    var outputFile = path.join(rootDir, '_references.d.ts');
                    utils.ensureWriteFile(outputFile, lines, function(err) {
                        if (err) {
                            notify.error(err);
                            throw err;
                        }
                        gutil.log('Generated ' + outputFile);
                        done();
                    });
                });                    
            };

            async.map(options.typescriptDirs, writeFile, cb);
        });

        gulp.task('install', ['generate-references']);
    }
}