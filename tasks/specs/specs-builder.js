var gutil = require('gulp-util');
var utils = require('../utils/utils');
var notify = require("../utils/notify");
var unglob = require("../utils/resolve-glob");

module.exports = function(options) {
    
    var path = require('path');
    options.configFile = path.join(process.cwd(), options.configFile || 'karma.conf.js');
    options.outputFile = options.outputFile || 'build/build-specs.js';

    return function(gulp) {
        var karma = require('karma');

        gulp.task('clean-specs', function(cb) {
            var del = require('del');

            del(options.outputFile, function (err) {
                gutil.log("Deleted " + options.outputFile);
                cb(err);
            });
        });

        gulp.task('bundle-specs', ['clean-specs'], function (cb) {
            var Duo = require("duo");
            var typescript = require('duo-typescript');
            var duo = new Duo(process.cwd())

            var specs = unglob("./src/**/*-spec.ts");

            specs.forEach(function(spec) {
                duo.entry(spec);
                console.log('a: ' + spec);
            })

            duo
            //  .entry(options.entryJs)
              .use(typescript())
              .run(function(err, src) {
                    if (err) {
                        console.log(err);
                        cb();
                    }
                    else {                
                        var filename = options.outputFile;
                        utils.ensureWriteFile(filename, src, function(err) {
                            if (err) throw err;
                            gutil.log('Generated ' + filename);
                            cb();
                        });
                    }
                });
        });

        var watchOpts =  { 
            read: false, 
            debounceDelay: 1000, 
            interval: 500 
        };

        gulp.task('watch-specs', [ 'bundle-specs' ], function () {
            var resolve = require('component-resolve-list');

            resolve.scripts({ development: true }, function(filelist) {
                filelist = filelist.filter(function(filename) {
                    return !utils.endsWith(filename, '_dependencies.d.ts');
                });
                
                gulp.watch(filelist, watchOpts, [ 'bundle-specs' ]);
            });
        });

        gulp.task('run-karma', [ 'bundle-specs' ], function (cb) {
            karma.server.start({
                configFile: options.configFile,
                singleRun: true
            }, cb);
        });
        
        gulp.task('watch-karma', [ 'watch-specs' ], function (cb) {
            karma.server.start({
                configFile: options.configFile,
                autoWatch: true
            }, cb);
        });
        
        gulp.task('specs', ['run-karma']);
        gulp.task('watch', ['watch-specs', 'watch-karma']);
        gulp.task('default', ['specs']);
    }
}