var fs = require('fs');
var gutil = require('gulp-util');
var utils = require('../utils/utils');
var notify = require('../utils/notify');

module.exports = function(options) {

    options = options || {};
    options.entryJs = options.entryJs || "index.js";
    options.entryCss = options.entryCss || "index.css";
    
    return function(gulp) {
        gulp.task('clean-scripts', function(cb) {
            var del = require('del');
            
            del('build/build.js', function (err) {
                gutil.log("Deleted " + 'build/build.js');
                cb(err);
            });
        });

        gulp.task('bundle-scripts', ['clean-scripts'], function (cb) {
            var Duo = require("duo");
            var typescript = require('duo-typescript');
            var duo = new Duo(process.cwd())

            duo
              .entry(options.entryJs)
              .use(typescript())
              .run(function(err, src) {
                    if (err) {
                        console.log(err);
                        cb();
                    }
                    else {                
                        var filename = 'build/build.js';
                        utils.ensureWriteFile(filename, src, function(err) {
                            if (err) throw err;
                            gutil.log('Generated ' + filename);
                            cb();
                        });
                    }
                });
        });

        gulp.task('clean-styles', function(cb) {
            var del = require('del');
            
            del('build/build.css', function (err) {
                gutil.log("Deleted " + 'build/build.css');
                cb(err);
            });
        });


        gulp.task('bundle-styles', ['clean-styles'], function (cb) {
            var Duo = require("duo");
            var duo = new Duo(process.cwd())
            //var sass = require('component-builder-sass');

            duo
              .entry(options.entryCss)
              .run(function(err, src) {
                    if (err) {
                        gutil.log(err);
                        cb();
                    }
                    else {                
                        var filename = 'build/build.css';
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

        gulp.task('watch-scripts', [ 'bundle-scripts' ], function () {
            var resolve = require("component-resolve-list");

            resolve.scripts(function(filelist) {
                gulp.watch(filelist, watchOpts, [ 'bundle-scripts' ]);
            });
        });

        gulp.task('watch-styles', [ 'bundle-styles' ], function () {
            var resolve = require("component-resolve-list");

            resolve.styles(function(filelist) {
                gulp.watch(filelist, watchOpts, [ 'bundle-styles' ]);
            });
        });

        gulp.task('watch-files', [ 'bundle-files' ], function () {
            var resolve = require("component-resolve-list");

            resolve.files(function(filelist) {
                gulp.watch(filelist, watchOpts, [ 'bundle-files' ]);
            });
        });

        gulp.task('bundle', ['bundle-scripts', 'bundle-styles']);
        gulp.task('watch', ['watch-scripts', 'watch-styles']);
        gulp.task('default', ['bundle']);
    }
}